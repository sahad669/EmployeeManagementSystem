import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages,deleteMessage } from "../features/contactSlice";
import { Loader2, Mail,Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminMessages = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.messages);
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

const handleDelete = (id)=>{
  dispatch(deleteMessage(id))
}


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2
          className={`animate-spin ${darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"}`}
          size={40}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-6xl mx-auto px-6 py-10 space-y-8 rounded-2xl shadow-2xl border transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-br from-[#112d4e] via-[#274472] to-[#47CFFF] border-[#198FFF]/40 text-[#A1F6FF]"
            : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#5B99ED]/40 text-[#274472]"
        }`}
    >
      <div className="flex items-center justify-center gap-3">
        <Mail className={`${darkMode ? "text-[#A1F6FF]" : "text-[#274472]"}`} size={30} />
        <h2
          className={`text-2xl font-bold text-center ${
            darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
          }`}
        >
          Employee Messages
        </h2>
      </div>

      {list.length === 0 ? (
        <p
          className={`text-center italic ${
            darkMode ? "text-red-500" : "text-red-500"
          }`}
        >
          No messages yet.
        </p>
      ) : (
        <div className="space-y-6">
          {list.map((msg, index) => (
            <motion.div
              key={msg._id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-xl border shadow-md transition-all duration-300 hover:scale-[1.01]
                ${
                  darkMode
                    ? "bg-[#274472]/80 border-[#198FFF]/40 hover:border-[#47CFFF]"
                    : "bg-[#F6FAFF]/80 border-[#5B99ED]/30 hover:border-[#198FFF]"
                }`}
            >
              <p className="font-semibold text-lg mb-1">
                <span className="opacity-80">👤</span> {msg.name}
              </p>
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-[#A1F6FF]/80" : "text-[#274472]/80"
                }`}
              >
                ✉️ {msg.email}
              </p>
              <p
                className={`mb-3 leading-relaxed ${
                  darkMode ? "text-[#C7E9FF]" : "text-[#1E3A5F]"
                }`}
              >
                “{msg.message}”
              </p>
              <p
                className={`text-xs text-right italic ${
                  darkMode ? "text-[#7DB9DB]" : "text-[#5B99ED]"
                }`}
              >
                {new Date(msg.createdAt).toLocaleString()}
              </p>
               <button
                          onClick={() => handleDelete(msg._id)}
                          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md mx-auto"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
            </motion.div>
          ))}
          
        </div>
      )}
    </motion.div>
  );
};

export default AdminMessages;

