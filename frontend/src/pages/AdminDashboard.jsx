import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import Departments from "../components/Departments";
import DepartmentCards from "../components/DepartmentCard";
import EmployeeList from "../components/EmployeeList";
import Employees from "../components/Employees";
import Attendance from "../components/Attendance";
import AdminMessages from "../components/AdminMessages";
import EmployeeDetails from "../components/EmployeeDetails";
import ChatBot from "../components/ChatBot";
import { fetchDepartment } from "../features/departmentSlice";
import { fetchEmployee } from "../features/employeeSlice";
import { fetchMessages } from "../features/contactSlice";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { departments } = useSelector((state) => state.department);
  const { employees } = useSelector((state) => state.employee);
  const { darkMode } = useSelector((state) => state.theme);
const { messages} = useSelector((state) => state.messages);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  
  const handleLogin = () => navigate("/login");

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#0A2540] via-[#274472] to-[#47CFFF]"
          : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF]"
      }`}
    >
      <Navbar
        title="Admin Dashboard"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <AdminSidebar
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
                “Great things in business are never done by one person. They’re
                done by a team of people.”
              </motion.p>
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* Employees Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-3xl shadow-xl p-10 h-56 flex flex-col items-center justify-center cursor-pointer border
                    border-[#82E0FA]/30 bg-gradient-to-br from-[#198FFF] to-[#7DF9FF]"
                  onClick={() => setActiveSection("employeelist")}
                >
                  <span className="text-6xl mb-4">👥</span>
                  <h1 className="text-xl font-bold">TOTAL EMPLOYEES</h1>
                  <span className="text-3xl font-bold mt-1">
                    {employees?.length}
                  </span>
                </motion.div>
                {/* Departments Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-3xl shadow-xl p-10 h-56 flex flex-col items-center justify-center cursor-pointer border
                    border-[#82E0FA]/30 bg-gradient-to-br from-[#A5CDF2] to-[#47CFFF]"
                  onClick={() => setActiveSection("departmentCards")}
                >
                  <span className="text-6xl mb-4">📋</span>
                  <h1 className="text-xl font-bold">TOTAL DEPARTMENTS</h1>
                  <span className="text-3xl font-bold mt-1">
                    {departments.length}
                  </span>
                </motion.div>
                {/* Attendance Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-3xl shadow-xl p-10 h-56 flex flex-col items-center justify-center cursor-pointer border
                    border-[#82E0FA]/30 bg-gradient-to-br from-[#82E0FA] to-[#A1F6FF]"
                  onClick={() => setActiveSection("attendance")}
                >
                  <span className="text-6xl mb-4">📅</span>
                  <h1 className="text-xl font-bold">ATTENDANCE</h1>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-3xl shadow-xl p-10 h-56 flex flex-col items-center justify-center cursor-pointer border
    border-[#82E0FA]/30 bg-gradient-to-br from-[#82E0FA] to-[#A1F6FF]"
                  onClick={() => setActiveSection("messages")}
                >
                  <span className="text-6xl mb-4">📩</span>
                  <h1 className="text-xl font-bold">MESSAGES</h1>
                  <span className="text-3xl font-bold mt-1">{messages.length}</span>
                </motion.div>
              </div>

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
            </div>
          )}
          {activeSection === "addDepartment" && <Departments />}
          {activeSection === "departmentCards" && <DepartmentCards />}
          {activeSection === "employeelist" && (
            <EmployeeList
              onViewEmployee={(id) => {
                setSelectedEmployeeId(id);
                setActiveSection("employeeDetails");
              }}
            />
          )}
          {activeSection === "employeeDetails" && selectedEmployeeId && (
            <EmployeeDetails
              id={selectedEmployeeId}
              onBack={() => setActiveSection("employeelist")}
            />
          )}
          {activeSection === "addEmployees" && <Employees />}
          {activeSection === "attendance" && <Attendance role="admin" />}
          {activeSection === "messages" && <AdminMessages />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


