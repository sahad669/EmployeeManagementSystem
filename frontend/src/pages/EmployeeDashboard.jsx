import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import ViewEmployeeProfile from "../components/ViewEmployeeProfile";
import EditEmployeeProfile from "../components/EditEmployeeProfile";
import Attendance from "../components/Attendance";
import Contact from "../components/Contact"
import { motion } from "framer-motion";
import ChatBot from "../components/ChatBot";
import { IoChatbubbleEllipses } from "react-icons/io5";

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
   const [chatOpen, setChatOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#0A2540] via-[#274472] to-[#82E0FA]"
          : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF]"
      }`}
    >
      <Navbar
        title="Employee Dashboard"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <EmployeeSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          user={user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main
          className={`flex-1 min-h-screen p-8 pt-24 flex flex-col items-center justify-start md:ml-72 overflow-auto transition-all duration-300`}
        >
          {activeSection === "dashboard" && (
            <div className="flex flex-col items-center w-full gap-10 max-w-6xl">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`text-center text-2xl md:text-3xl italic font-semibold max-w-2xl select-none ${
                  darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                }`}
              >
                "Success is the sum of small efforts, repeated day in and day
                out."
              </motion.p>
              {/* Announcements Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-2xl p-7 rounded-3xl shadow-xl mb-9 border
                  ${
                    darkMode
                      ? "bg-[#112d4e] border-[#198FFF]/40"
                      : "bg-[#E3EDF7] border-[#A5CDF2]/40"
                  }`}
              >
                <h2
                  className={`text-lg md:text-xl font-semibold mb-4
                    ${darkMode ? "text-[#7DF9FF]" : "text-[#274472]"}
                  `}
                >
                  Recent Announcements
                </h2>
                <ul
                  className={`${
                    darkMode ? "text-[#A1F6FF]" : "text-[#1270BC]"
                  } space-y-3`}
                >
                  <li
                    className={`border-b ${
                      darkMode ? "border-[#7DF9FF]/40" : "border-[#A5CDF2]/30"
                    } pb-2`}
                  >
                    🚀 Company launches new benefits program effective October
                    1st.
                  </li>
                  <li
                    className={`border-b ${
                      darkMode ? "border-[#7DF9FF]/40" : "border-[#A5CDF2]/30"
                    } pb-2`}
                  >
                    📰 Q3 townhall scheduled for October 16th – join on Teams at
                    4pm.
                  </li>
                  <li>
                    🎉 Welcome new team members in the Engineering and HR
                    departments!
                  </li>
                </ul>
              </motion.div>
            </div>
            
          )}
          {activeSection === "viewProfile" && (
            <div className="w-full flex flex-col items-center">
              <ViewEmployeeProfile />
            </div>
          )}
          {activeSection === "editProfile" && (
            <div className="w-full flex flex-col items-center">
              <EditEmployeeProfile />
            </div>
          )}

           {activeSection === "contacts" && (
            <div className="w-full flex flex-col items-center">
              <Contact />
            </div>
          )}
          
          {activeSection === "attendance" && (
            <div className="w-full flex flex-col items-center">
              <Attendance employeeId={user?._id} role="employee" />
            </div>
          )}
              {!chatOpen && (
                <button
                  onClick={() => setChatOpen(true)}
                  className="fixed top-30 right-6 bg-gradient-to-br from-[#198FFF] to-[#7DF9FF] 
               hover:from-[#7DF9FF] hover:to-[#198FFF] text-white rounded-full p-4 shadow-2xl 
               transition-all duration-300 z-50"
                >
                  <IoChatbubbleEllipses size={28} />
                </button>
              )}

              {/* ChatBot Panel */}
              <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
          
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;