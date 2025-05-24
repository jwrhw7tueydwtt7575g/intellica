import { Eye } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup Succeeded");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1128] px-4">
      <div className="bg-gradient-to-tr from-[#122340] to-[#081a51] w-full max-w-md rounded-3xl p-8 shadow-[0_0_20px_#0ef] border border-cyan-600/50">
        {/* Heading */}
        <h1 className="text-center text-3xl font-extrabold text-cyan-400 tracking-widest mb-8 drop-shadow-[0_0_10px_rgba(14,239,255,0.8)] uppercase">
          Intellica Signup
        </h1>

        {/* Inputs */}
        {["firstName", "lastName", "email"].map((field) => (
          <div key={field} className="mb-6">
            <input
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-500 rounded-lg px-5 py-3 text-cyan-100 placeholder-cyan-400 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            />
          </div>
        ))}

        {/* Password */}
        <div className="mb-6 relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-500 rounded-lg px-5 py-3 text-cyan-100 placeholder-cyan-400 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          />
          <span className="absolute right-4 top-3 text-cyan-400 cursor-pointer">
            <Eye size={20} />
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>
        )}

        {/* Terms & Condition */}
        <p className="text-xs text-cyan-300 text-center mb-8">
          By signing up, you consent to Intellica's{" "}
          <a href="#" className="underline hover:text-cyan-200">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-cyan-200">
            Privacy Policy
          </a>
          .
        </p>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed drop-shadow-md"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Links */}
        <div className="flex justify-center mt-6 space-x-6 text-cyan-400 text-sm font-semibold">
          <Link to="/login" className="hover:underline">
            Already registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
