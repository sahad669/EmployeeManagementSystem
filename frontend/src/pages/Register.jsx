import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
     if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    toast.error("All fields are required!");
    return;
  }
    dispatch(register(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0A2540] via-[#274472] to-[#82E0FA]">
      <motion.div
        initial={{ opacity: 0, y: -36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.95,
          ease: "easeInOut",
        }}
        className="bg-[#182D49]/90 shadow-2xl rounded-3xl p-10 w-full max-w-md backdrop-blur-md border border-[#198FFF]/30"
      >
        <h2 className="text-3xl font-bold text-center text-[#7DE3FF] mb-8 drop-shadow">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            onChange={handleData}
            type="text"
            name="name"
            value={data.name}
            placeholder="Enter Full Name"
            className="w-full px-4 py-3 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
          />
          <input
            onChange={handleData}
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter Email Address"
            className="w-full px-4 py-3 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
          />
          <input
            onChange={handleData}
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
          />
          <input
            onChange={handleData}
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
          />

          <button
            type="submit"
            className="w-full bg-[#7DE3FF] text-[#1A2D49] font-bold py-3 rounded-xl shadow-lg hover:bg-[#82E0FA] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-[#B4DCF9] text-sm">
          Already have an account?{" "}
          <span
            className="text-[#7DE3FF] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
