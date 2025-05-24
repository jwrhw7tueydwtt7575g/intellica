import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Promt from "./Promt";
import { Menu } from "lucide-react";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] text-[#f9fafb] overflow-hidden font-sans">
      {/* Sidebar (slide-in) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transition-transform z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex-shrink-0
        bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-lg shadow-cyan-600/40 rounded-r-3xl`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} isVisible={isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full md:ml-64 bg-[#111827]">
        {/* Header for mobile */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-cyan-700 bg-[#12263f] shadow-md">
          <div className="text-2xl font-extrabold tracking-widest text-cyan-400 uppercase drop-shadow-md">
            intellica
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-cyan-600/30 transition"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-cyan-400" />
          </button>
        </div>

        {/* Message area */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
          <Promt />
        </div>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;

