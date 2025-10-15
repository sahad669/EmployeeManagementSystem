import { useSelector } from "react-redux";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title, onToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`flex flex-wrap items-center justify-between w-full sticky top-0 z-40 py-3 px-5 bg-opacity-90 shadow-xl border-b
        ${
          darkMode
            ? "bg-gradient-to-r from-[#0A2540] via-[#274472] to-[#198FFF] border-[#198FFF]/30"
            : "bg-gradient-to-r from-[#E3EDF7] via-[#F6F9FC] to-[#A5CDF2] border-[#5B99ED]/20"
        }`}
    >
      {/*  Hamburger and title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className={`md:hidden p-2 rounded-xl transition focus:outline-none focus:ring-2
            ${
              darkMode
                ? "bg-[#198FFF] hover:bg-[#6FB0F6] focus:ring-[#47CFFF]"
                : "bg-[#5B99ED] hover:bg-[#A5CDF2] focus:ring-[#198FFF]"
            }`}
          aria-label="Toggle Sidebar"
        >
          <Menu
            size={24}
            className={darkMode ? "text-[#0A2540]" : "text-[#274472]"}
          />
        </button>
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-wider select-none
            ${darkMode ? "text-[#56B6F7]" : "text-[#274472]"}
          `}
        >
          {title}
        </h1>
      </div>

      {/* Right: User info & Logout */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden sm:block text-right">
          {user && user.email ? (
            <>
              <div
                className={`${
                  darkMode ? "text-white" : "text-[#21314A]"
                } font-semibold truncate`}
              >
                {user.email}
              </div>
              <div
                className={`${
                  darkMode ? "text-white" : "text-[#21314A]"
                } font-semibold truncate`}
              >
                {user.role}
              </div>
            </>
          ) : (
            <>
              <div
                className={`${
                  darkMode ? "text-white" : "text-[#21314A]"
                } font-semibold`}
              >
                Admin
              </div>
              <div className="text-xs font-bold text-[#82E0FA] capitalize">
                Not logged in
              </div>
            </>
          )}
        </div>

        <div
          className={`block sm:hidden font-semibold text-xs capitalize truncate max-w-[70px] text-[#82E0FA]`}
        >
          {user && user.role ? user.role : "Admin"}
        </div>

        <button
          onClick={handleLogout}
          className={`p-2 rounded-xl transition focus:outline-none focus:ring-2
            ${
              darkMode
                ? "bg-[#198FFF] hover:bg-[#47CFFF] focus:ring-[#6FB0F6]"
                : "bg-[#5B99ED] hover:bg-[#A5CDF2] focus:ring-[#198FFF]"
            }`}
          aria-label="Logout"
        >
          <LogOut
            size={20}
            className={darkMode ? "text-[#0A2540]" : "text-[#274472]"}
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
