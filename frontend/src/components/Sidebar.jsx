import React from "react";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar({ onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert(data.message);
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.errors || "Logout Failed");
    }
  };

  return (
    <div className="h-full w-full max-w-xs flex flex-col justify-between p-6 bg-gradient-to-b from-[#081a51] to-[#0a1128] border-r border-cyan-600/40 shadow-[0_0_20px_#0ef] rounded-r-3xl transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-cyan-600/30 pb-3">
          <div className="text-3xl font-extrabold text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(14,239,255,0.8)]">
            Intellica
          </div>
          <button onClick={onClose} className="md:hidden">
            <X className="w-6 h-6 text-cyan-400 hover:text-cyan-200 transition" />
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4">
          <button
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold px-5 py-3 rounded-2xl shadow-md transition"
            onClick={onClose}
          >
            + New Chat
          </button>
          <div className="text-cyan-300 text-sm mt-24 text-center italic">
            No chat history yet
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-cyan-600/30">
        <div className="flex items-center gap-3 cursor-default mb-4">
          <img
            src="https://i.pravatar.cc/32"
            alt="profile"
            className="rounded-full w-10 h-10 border-2 border-cyan-500 shadow-[0_0_10px_#0ef]"
          />
          <span className="text-cyan-300 font-semibold text-lg select-none">
            {user ? user?.firstName : "My Profile"}
          </span>
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-center bg-transparent border border-cyan-500 text-cyan-400 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-cyan-500 hover:text-black transition shadow-[0_0_15px_#0ef]"
          >
            <LogOut className="stroke-cyan-400 group-hover:stroke-black transition" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

