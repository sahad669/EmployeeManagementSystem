
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { createMessage } from "../features/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme); // for dark mode
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(createMessage({ name, email, message }));
      if (result.payload?.success) {
        // toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-4xl mx-auto px-6 py-10 space-y-10 rounded-2xl shadow-2xl border transition-colors duration-300 mt-20
        ${
          darkMode
            ? "bg-gradient-to-br from-[#112d4e] via-[#274472] to-[#47CFFF] border-[#198FFF]/40 text-[#A1F6FF]"
            : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#5B99ED]/40 text-[#274472]"
        }`}
    >
      <form onSubmit={handleSubmit}>
        <h2
          className={`text-2xl font-bold mb-8 text-center ${
            darkMode ? "text-[#82E0FA]" : "text-[#274472]"
          }`}
        >
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
        </div>

        <textarea
          name="message"
          placeholder="Enter your message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className={`w-full p-4 rounded-lg border mb-6 transition focus:outline-none focus:ring-2 resize-none ${
            darkMode
              ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
              : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] text-lg font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;