import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee, deleteEmployee } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const EmployeeList = ({ onViewEmployee }) => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);
  const { darkMode } = useSelector((state) => state.theme);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2
          className={`w-10 h-10 animate-spin ${
            darkMode ? "text-[#47CFFF]" : "text-[#198FFF]"
          }`}
        />
      </div>
    );
  }

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id));
    dispatch(fetchEmployee());
  };

  const filteredEmployees = (employees || [])
    .filter((emp) => emp.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((emp) =>
      departmentFilter ? emp.department?.department === departmentFilter : true
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-5xl mx-auto p-6 rounded-2xl shadow-xl text-white border transition-colors duration-300 ${
        darkMode
          ? "bg-[#112d4e] border-[#198FFF]/40"
          : "bg-[#E3EDF7] border-[#5B99ED]/40"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-[#82E0FA]" : "text-[#274472]"
          }`}
        >
          Employee List
        </h2>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`p-3 rounded-lg border flex-1 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
            darkMode
              ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
              : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
          }`}
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className={`p-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
              : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
          }`}
        >
          <option value="">All Departments</option>
          {[...new Set((employees || []).map((e) => e.department?.department))]
            .filter(Boolean)
            .map((dep, i) => (
              <option key={i} value={dep}>
                {dep}
              </option>
            ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm table-auto">
          <thead
            className={`text-xs uppercase ${
              darkMode
                ? "bg-[#274472] text-[#A1F6FF]"
                : "bg-[#A5CDF2] text-[#21314A]"
            }`}
          >
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.map((emp,idx) => (
              <tr
                key={emp._id}
                className={`transition-colors ${
                      darkMode
                        ? idx % 2 === 0
                          ? "bg-[#112d4e]"
                          : "bg-[#1A446B]"
                        : idx % 2 === 0
                        ? "bg-[#F6FAFF]"
                        : "bg-[#D9EEFF]"
                    } hover:bg-[#82E0FA]/40`}
              >
                <td
                  className={`p-3 ${
                    darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                  }`}
                >
                  {emp.name}
                </td>
                <td
                  className={`p-3 ${
                    darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                  }`}
                >
                  {emp.email}
                </td>
                <td
                  className={`p-3 ${
                    darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                  }`}
                >
                  {emp.role}
                </td>
                <td
                  className={`p-3 ${
                    darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                  }`}
                >
                  {emp.department?.department || "N/A"}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => onViewEmployee(emp._id)}
                    className="bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] px-4 py-1 rounded-lg font-semibold transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees?.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-md py-4 text-red-400 font-semibold"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EmployeeList;
