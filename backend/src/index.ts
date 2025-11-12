import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import supabase from "./supaBaseClient"; // Your Supabase client file
import { authenticateToken, AuthenticatedRequest } from "./middleware/authenticationToken";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const SECRET = process.env.JWT_SECRET || "fallback_secret";

// Hardcoded admin (for testing)
const hardcodedUser = {
  username: process.env.ADMIN_USERNAME || "events.gymkhana",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "$2b$10$OiYMi5raT00B/IRNncF0ye.Fv00c2qtyjYGnEp8WbtPUVwtzNXqQ.",
};

// ----------- AUTH LOGIN -----------
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username !== hardcodedUser.username) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, hardcodedUser.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET, { algorithm: "HS256", expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ----------- CREATE EVENT -----------
app.post("/api/events", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string" || !("username" in req.user)) {
      return res.status(401).json({ message: "Unauthorized: username missing" });
    }
    const username = (req.user as JwtPayload & { username: string }).username;
    const { hostingAuthority, venue, startTime, endTime, description, registrationForm } = req.body;

    // Validate dates
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Find or create user in Supabase
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    if (!user) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ username }])
        .select()
        .single();
      if (insertError) throw insertError;
      user = newUser;
    }

    // Insert event
    const { data: newEvent, error: eventError } = await supabase
      .from("events")
      .insert([{
        hostingAuthority,
        venue,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        description,
        registrationForm,
        host_id: user.id
      }])
      .select()
      .single();

    if (eventError) throw eventError;
    res.status(201).json(newEvent);

  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({ message: "Failed to create event", error: error instanceof Error ? error.message : error });
  }
});

// ----------- GET ALL EVENTS -----------
app.get("/api/events", async (req: Request, res: Response) => {
  try {
    const { data: events, error } = await supabase
      .from("events")
      .select(`
        *,
        host:users(id, username)
      `);
    if (error) throw error;
    res.json(events);
  } catch (error) {
    console.error("Fetching events error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// ----------- DELETE EVENT -----------
app.delete("/api/events/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const eventId = parseInt(req.params.id, 10);
  try {
    // Fetch event
    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();
    if (fetchError) return res.status(404).json({ message: "Event not found" });

    if (!req.user || typeof req.user === "string" || !("username" in req.user)) {
      return res.status(401).json({ message: "Unauthorized: username missing" });
    }
    const username = (req.user as JwtPayload & { username: string }).username;

    // Fetch host user
    const { data: hostUser, error: hostError } = await supabase
      .from("users")
      .select("*")
      .eq("id", event.host_id)
      .single();
    if (hostError) throw hostError;

    if (hostUser.username !== username && username !== "events.gymkhana") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);
    if (deleteError) throw deleteError;

    res.status(200).json({ message: "Event deleted successfully." });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
app.listen(process.env.PORT || 8080, async () => {
  console.log("🔗 Connecting to Supabase:", process.env.SUPABASE_URL);
  console.log(`🚀 Backend running at http://localhost:${process.env.PORT || 8080}`);
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) {
      console.error("❌ Supabase connection failed:", error.message);
    } else {
      console.log("✅ Supabase connected successfully.");
    }
  } catch (err: any) {
    console.error("❌ Error testing Supabase connection:", err.message);
  }
});
