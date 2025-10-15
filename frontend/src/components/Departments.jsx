import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  fetchDepartment,
  deleteDepartment,
} from "../features/departmentSlice";
import { Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Departments = () => {
  const dispatch = useDispatch();
  const { departments, loading } = useSelector((state) => state.department);
  const { darkMode } = useSelector((state) => state.theme);
  const [data, setData] = useState({ department: "", description: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.department) return;
    dispatch(addDepartment(data));
    setData({ department: "", description: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteDepartment(id));
  };

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-10 transition-colors duration-300">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`shadow-xl rounded-2xl p-8 w-full border ${
          darkMode
            ? "bg-[#112d4e] border-[#198FFF]/30"
            : "bg-[#E3EDF7] border-[#5B99ED]/40"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? "text-[#82E0FA]" : "text-[#274472]"
          }`}
        >
          Create New Department
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            onChange={handleData}
            type="text"
            name="department"
            value={data.department}
            placeholder="Enter Department Name"
            className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
            required
          />
          <input
            onChange={handleData}
            type="text"
            name="description"
            value={data.description}
            placeholder="Enter role of the Department"
            className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] font-semibold py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Add Department"
            )}
          </button>
        </form>
      </motion.div>

      {/* Department Table */}
      <div className="overflow-x-auto w-full max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader2
              className={`w-10 h-10 animate-spin ${
                darkMode ? "text-[#47CFFF]" : "text-[#198FFF]"
              }`}
            />
          </div>
        ) : !departments || departments.length === 0 ? (
          <p
            className={`text-center text-lg font-semibold ${
              darkMode ? "text-[#82E0FA]" : "text-[#274472]"
            }`}
          >
            There are no departments. Create one above.
          </p>
        ) : (
          <div
            className={`shadow-xl rounded-2xl p-6 border transition-colors duration-300 ${
              darkMode
                ? "bg-[#112d4e] border-[#198FFF]/30"
                : "bg-[#E3EDF7] border-[#5B99ED]/40"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? "text-[#82E0FA]" : "text-[#274472]"
              }`}
            >
              Department List
            </h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border-collapse text-left text-sm table-auto">
                <thead
                  className={`text-xs uppercase ${
                    darkMode
                      ? "bg-[#274472] text-[#A1F6FF]"
                      : "bg-[#A5CDF2] text-[#21314A]"
                  }`}
                >
                  <tr>
                    <th className="px-6 py-3 text-[#A1F6FF] text-left">
                      Department
                    </th>
                    <th className="px-6 py-3 text-[#A1F6FF] text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dep, idx) => (
                    <tr
                      key={dep._id}
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
                        className={`px-6 py-3 font-semibold ${
                          darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                        }`}
                      >
                        {dep.department}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDelete(dep._id)}
                          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md mx-auto"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
