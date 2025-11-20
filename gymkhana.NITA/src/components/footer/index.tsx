"use client";
import React from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";

const Footer: React.FC = () => {
  const [showAllBlogs, setShowAllBlogs] = React.useState(false);

  const blogs = [
    {
      title: "Articulate Masterclass presented by NITA",
      description:
        "Communication is one of the most powerful skills in today’s world. Whether it’s for job placements, professional growth, or day-to-day interactions, effective communication helps us connect and succeed.",
    },
    {
      title: "Some journeys don’t end with graduation whereas they begin from there.",
      description:
        "‘Beyond the Batch’, an initiative by The Board of Technical Community (BTC), Gymkhana NIT Agartala, brings you the story of Rajkush Kumar Goswami, a trailblazer whose pursuit of innovation reminds us that passion doesn't graduate, it evolves.",
    },
    { title: "To be Updated soon.....", description: "" },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-0 sm:px-6 lg:px-8">
        

        {/* BLOG SECTION */}
        <div className="w-full py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>

            {/* IMPORTANT: give z-index and pointer-events explicitly */}
            <button
              onClick={() => {
                console.log("See all toggled ->", !showAllBlogs);
                setShowAllBlogs((s) => !s);
              }}
              className="text-sm text-primary font-medium hover:underline relative z-50"
              style={{ pointerEvents: "auto" }}
            >
              {showAllBlogs ? "Show less" : "See all"}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {blogs.slice(0, showAllBlogs ? blogs.length : 1).map((blog, index) => (
              <Link
                key={index}
                href={index === 0 ? "/blog1" : index === 1 ? "/blog2" : "#"}
                className="w-full border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white block cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{blog.title}</h3>

                <p className="text-gray-700 text-justify leading-relaxed line-clamp-3">
                  {blog.description}
                </p>

                <p className="mt-2 text-blue-600 text-sm font-medium">Read full blog →</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FOOTER GRID */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-center text-sm text-gray-500 lg:text-left lg:text-[1rem]">
              Get the latest news and updates from our team. Stay tuned for upcoming events and club activities on campus.
            </p>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              {socialItems?.map((item, index) => (
                <SocialLink key={index} {...item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex flex-row items-center justify-center gap-8">
              <div>
                <strong className="font-medium text-gray-900">Navigation</strong>
                <ul className="mt-6 space-y-1">
                  {navigationItems?.map((item, index) => (
                    <li key={index}>
                      <Item {...item} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="font-medium text-gray-900">About</strong>
                <ul className="mt-6 space-y-1">
                  {aboutItems?.map((item, index) => (
                    <li key={index}>
                      <Item {...item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 border-t border-gray-100 pt-8">
          <p className="text-center text-xs/relaxed text-gray-500">
            © Gymkhana NITA {new Date().getFullYear()}. All rights reserved.
            <br />
            Created with <LuBinary className="inline" /> by BTC.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* SUPPORTING COMPONENTS */
interface SocialLinkProps {
  href: string;
  Icon: IconType;
  label: string;
}

const socialItems: SocialLinkProps[] = [
  { href: "https://www.facebook.com", Icon: FaFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/gymkhana_nita?igsh=aG16M3hxejN2NGt5", Icon: FaInstagram, label: "Instagram" },
  { href: "https://www.twitter.com", Icon: FaXTwitter, label: "Twitter" },
  { href: "https://www.linkedin.com/company/board-of-technical-community-btc/posts/?feedView=all", Icon: FaLinkedin, label: "LinkedIn" },
];

const SocialLink = ({ href, Icon, label }: SocialLinkProps) => (
  <Link href={href} target="_blank" rel="noreferrer" className="inline-flex items-center">
    <Icon className="text-lg text-neutral-700" />
    <span className="sr-only">{label}</span>
  </Link>
);

interface ItemProps {
  href: string;
  label: string;
}

const aboutItems: ItemProps[] = [
  { href: "#hero", label: "About Us" },
  { href: "mailto:complaints.gymkhana@zohomail.in", label: "Report Us" },
  { href: "/privacy", label: "Privacy Policy" },

];

const navigationItems: ItemProps[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/clubs", label: "Clubs" },

];

const Item = ({ href, label }: ItemProps) => (
  <Link href={href} className="text-sm text-gray-700 transition hover:text-gray-700/75">
    {label}
  </Link>
);

export default Footer;
