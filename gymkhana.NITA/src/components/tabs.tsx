"use client";

import { useState } from "react";

const tabs = [
  { name: "- Gymkhana Technical", logo: "/btc-logo.png" },
  { name: "- Gymkhana Cultural", logo: "/btc-logo.png" },
  { name: "- Gymkhana Sports", logo: "/btc-logo.png" },
  { name: "- Gymkhana Alumni", logo: "/btc-logo.png" }
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Technical");

  return (
    <section>
      <div className="flex flex-col space-y-4 mb-4">
        {tabs.map((tab) => (
          <div key={tab.name} className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab(tab.name)}>
            <span className={activeTab === tab.name ? "" : ""}>{tab.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
