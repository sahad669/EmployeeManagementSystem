import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { Sun, Moon  } from "lucide-react";

const AdminSidebar = ({
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

      <aside
         className={`fixed top-0 left-0 w-72 h-full flex flex-col px-7 py-7 z-30 transition-transform duration-300 rounded-tr-3xl rounded-br-3xl shadow-2xl
          ${darkMode ? "bg-gradient-to-b from-[#112d4e] via-[#274472] to-[#7DF9FF] border-[#198FFF]/40" : "bg-gradient-to-b from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#A5CDF2]/40"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          overflow-y-auto
        `}
        aria-label="Admin Sidebar Navigation"
      >
        <nav className="flex-1 flex flex-col space-y-3 mt-16 overflow-y-auto pb-6">
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
            🏠 Dashboard
          </button>

          <button
            onClick={() => setActiveSection("addEmployees")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
  ${
    activeSection === "addEmployees"
      ? darkMode
        ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
        : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
      : darkMode
      ? "bg-[#274472] text-[#82E0FA] border-transparent"
      : "bg-[#E3EDF7] text-[#274472] border-transparent"
  } hover:bg-[#7DF9FF]/80`}
          >
            👥 Add & Edit
          </button>

          <button
            onClick={() => setActiveSection("addDepartment")}
            className={`w-full text-left py-3 pl-4 rounded-lg font-semibold transition focus:outline-none
  ${
    activeSection === "addDepartment"
      ? darkMode
        ? "bg-[#198FFF] text-[#112d4e] border-[#82E0FA]"
        : "bg-[#A5CDF2] text-[#21314A] border-[#5B99ED]"
      : darkMode
      ? "bg-[#274472] text-[#82E0FA] border-transparent"
      : "bg-[#E3EDF7] text-[#274472] border-transparent"
  } hover:bg-[#7DF9FF]/80`}
          >
            📋 Add Departments
          </button>

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
            📅 Attendance
          </button>
          

          <button
            onClick={() => dispatch(toggleTheme())}
            className={`flex items-center gap-2 rounded-lg font-semibold py-3 pl-4 transition focus:outline-none
                        ${
                          darkMode
                            ? "bg-[#274472] text-[#82E0FA]"
                            : "bg-[#A5CDF2] text-[#21314A]"
                        } hover:bg-[#198FFF]/80`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

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
              🔐 Login
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
              🚪 Logout
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;


