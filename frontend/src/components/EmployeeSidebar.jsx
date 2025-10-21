import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { Sun, Moon } from "lucide-react";

const EmployeeSidebar = ({
  activeSection,
  setActiveSection,
  handleLogin,
  handleLogout,
  user,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full flex flex-col px-7 py-7 z-30 transition-transform duration-300 rounded-tr-3xl rounded-br-3xl shadow-2xl
          ${darkMode ? "bg-gradient-to-b from-[#112d4e] via-[#274472] to-[#7DF9FF] border-[#198FFF]/40" : "bg-gradient-to-b from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#A5CDF2]/40"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          overflow-y-auto
        `}
        aria-label="Employee Sidebar Navigation"
      >
        <nav className="flex-1 flex flex-col space-y-3 mt-20 overflow-y-auto pb-6">
          {/* Dashboard */}
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
              ${
                activeSection === "dashboard"
                  ? darkMode
                    ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                  : darkMode
                  ? "bg-[#274472] text-[#82E0FA] border-transparent"
                  : "bg-[#E3EDF7] text-[#274472] border-transparent"
              } hover:bg-[#7DF9FF]/80`}
          >
            🏠 <span>Dashboard</span>
          </button>

          {/* View Profile */}
          <button
            onClick={() => setActiveSection("viewProfile")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
              ${
                activeSection === "viewProfile"
                  ? darkMode
                    ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                  : darkMode
                  ? "bg-[#274472] text-[#82E0FA] border-transparent"
                  : "bg-[#E3EDF7] text-[#274472] border-transparent"
              } hover:bg-[#7DF9FF]/80`}
          >
            👤 <span>View Profile</span>
          </button>

          {/* Edit Profile */}
          <button
            onClick={() => setActiveSection("editProfile")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
              ${
                activeSection === "editProfile"
                  ? darkMode
                    ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                  : darkMode
                  ? "bg-[#274472] text-[#82E0FA] border-transparent"
                  : "bg-[#E3EDF7] text-[#274472] border-transparent"
              } hover:bg-[#7DF9FF]/80`}
          >
            ✏️ <span>Edit Profile</span>
          </button>

          {/* Attendance */}
          <button
            onClick={() => setActiveSection("attendance")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
              ${
                activeSection === "attendance"
                  ? darkMode
                    ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                  : darkMode
                  ? "bg-[#274472] text-[#82E0FA] border-transparent"
                  : "bg-[#E3EDF7] text-[#274472] border-transparent"
              } hover:bg-[#7DF9FF]/80`}
          >
            📅 <span>Attendance</span>
          </button>

          {/* Toggle Theme */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`flex items-center gap-3 font-semibold py-3 pl-4 rounded-xl transition focus:outline-none
              ${
                darkMode
                  ? "bg-[#274472] text-[#7DF9FF]"
                  : "bg-[#A5CDF2] text-[#21314A]"
              } hover:bg-[#198FFF]/80`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Contacts */}
          <button
            onClick={() => setActiveSection("contacts")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
              ${
                activeSection === "contacts"
                  ? darkMode
                    ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                  : darkMode
                  ? "bg-[#274472] text-[#82E0FA] border-transparent"
                  : "bg-[#E3EDF7] text-[#274472] border-transparent"
              } hover:bg-[#7DF9FF]/80`}
          >
            📩 <span>Contacts</span>
          </button>

          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={handleLogin}
              className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
                ${
                  darkMode
                    ? "bg-[#274472] text-[#82E0FA] border-transparent"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                } hover:bg-[#7DF9FF]/80`}
            >
              🔐 <span>Login</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
                ${
                  darkMode
                    ? "bg-[#274472] text-[#82E0FA] border-transparent"
                    : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
                } hover:bg-[#7DF9FF]/80`}
            >
              🚪 <span>Logout</span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};

export default EmployeeSidebar;


