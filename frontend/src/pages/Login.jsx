import { login } from "../features/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login(data)).unwrap();
      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#0A2540] via-[#274472] to-[#82E0FA]">
      <motion.form
        initial={{ opacity: 0, y: -36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.95,
          ease: "easeInOut",
        }}
        onSubmit={handleSubmit}
        className="bg-[#182D49]/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[#198FFF]/30"
      >
        <h2 className="text-3xl font-bold text-center text-[#7DE3FF] mb-6 drop-shadow">
          Login
        </h2>

        <input
          onChange={handleData}
          type="email"
          name="email"
          value={data.email}
          placeholder="Enter Email Address"
          className="w-full px-4 py-3 mb-5 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
        />

        <input
          onChange={handleData}
          type="password"
          name="password"
          value={data.password}
          placeholder="Enter Password"
          className="w-full px-4 py-3 mb-7 rounded-xl bg-[#23385B] text-[#B4DCF9] placeholder-[#8AAEDC] border border-[#7DE3FF] focus:outline-none focus:ring-2 focus:ring-[#82E0FA] shadow"
        />

        <button
          type="submit"
          className="w-full bg-[#7DE3FF] hover:bg-[#82E0FA] text-[#1A2D49] font-bold py-3 rounded-xl shadow-lg transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-[#B4DCF9] text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            className="text-[#7DE3FF] hover:underline cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
