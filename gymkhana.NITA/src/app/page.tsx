import React from "react";
import { Footer, Hero, Navbar } from "~/components";
import MobileNavbar from "./(user)/components/sidebar/mobile";
import { homePageItems as items } from "~/lib/data";

export const metadata = {
  title: "NIT Agartala Gymkhana | Official Student Body of NIT Agartala",
  description:
    "Official website of NIT Agartala Gymkhana – student council, clubs, cultural and sports activities of National Institute of Technology Agartala.",
};

const Home = () => {
  return (
    <div>
      <h1 className="sr-only">NIT Agartala Gymkhana</h1>

      <MobileNavbar items={items} />

      <div className="hidden lg:flex">
        <Navbar />
      </div>

      <Hero />

      <Footer />
    </div>
  );
};

export default Home;
