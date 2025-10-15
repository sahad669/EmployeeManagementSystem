import React, { useState, useEffect } from "react";
import {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
} from "../features/employeeSlice";
import { fetchDepartment } from "../features/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Loader2, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

const Employees = () => {
  const { employees, loading } = useSelector((state) => state.employee);
  const { departments } = useSelector((state) => state.department);
  const { darkMode } = useSelector((state) => state.theme);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchDepartment());
  }, [dispatch]);

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      department: "",
    });
    setImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (image) formData.append("image", image);

    if (editId) {
      await dispatch(editEmployee({ id: editId, data: formData }));
    } else {
      await dispatch(addEmployee(formData));
    }

    dispatch(fetchEmployee());
    resetForm();
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setData({
      name: emp.name,
      email: emp.email,
      password: "",
      phone: emp.phone,
      role: emp.role,
      department: emp.department?._id || "",
    });
    setImage(null);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id));
    dispatch(fetchEmployee());
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 space-y-10 min-h-screen transition-colors duration-300 ${
        darkMode ? "" : ""
      }`}
    >
      {/* Employee Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`shadow-xl rounded-2xl p-8 border ${
          darkMode
            ? "bg-[#112d4e] border-[#198FFF]/30"
            : "bg-[#E3EDF7] border-[#5B99ED]/40"
        }`}
      >
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <h2
            className={`md:col-span-2 text-3xl font-bold mb-6 ${
              darkMode ? "text-[#82E0FA]" : "text-[#274472]"
            }`}
          >
            {editId ? "Edit Employee" : "Add New Employee"}
          </h2>
          <input
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Full Name"
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF] placeholder-[#7DB9DB]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472] placeholder-[#8AAEDC]"
            }`}
            required
          />
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF] placeholder-[#7DB9DB]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472] placeholder-[#8AAEDC]"
            }`}
            required
          />
          <input
            name="phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="Phone"
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF] placeholder-[#7DB9DB]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472] placeholder-[#8AAEDC]"
            }`}
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder={editId ? "Password (leave blank to keep)" : "Password"}
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF] placeholder-[#7DB9DB]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472] placeholder-[#8AAEDC]"
            }`}
            {...(!editId && { required: true })}
          />
          <select
            name="role"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472]"
            }`}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <select
            name="department"
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
            className={`p-3 rounded-lg border ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472]"
            }`}
          >
            <option value="">Select Department</option>
            {departments?.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.department}
              </option>
            ))}
          </select>
          <input
            type="file"
            className={`p-3 rounded-lg border md:col-span-2 ${
              darkMode
                ? "border-[#198FFF] bg-[#274472] text-[#A1F6FF]"
                : "border-[#5B99ED] bg-[#F6FAFF] text-[#274472]"
            }`}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] font-semibold py-3 px-6 rounded-lg transition shadow-md"
            >
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6 mx-auto" />
              ) : editId ? (
                "Update Employee"
              ) : (
                "Add Employee"
              )}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 py-3 px-6 rounded-lg font-semibold text-white hover:bg-gray-700 transition shadow-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>
      {/* Employee Table */}
      <div
        className={`shadow-xl rounded-2xl p-6 border ${
          darkMode
            ? "bg-[#112d4e] border-[#198FFF]/30"
            : "bg-[#E3EDF7] border-[#5B99ED]/40"
        }`}
      >
        <h2
          className={`text-4xl font-bold mb-6 ${
            darkMode ? "text-[#82E0FA]" : "text-[#274472]"
          }`}
        >
          Employees
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-left text-sm table-auto">
            <thead
              className={`text-xs uppercase ${
                darkMode
                  ? "bg-[#274472] text-[#A1F6FF]"
                  : "bg-[#A5CDF2] text-[#21314A]"
              }`}
            >
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp,idx) => (
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
                  <td className="px-4 py-2">
                    <img
                      src={emp.imageurl || "https://via.placeholder.com/80"}
                      alt={emp.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                    }`}
                  >
                    {emp.name}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                    }`}
                  >
                    {emp.email}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                    }`}
                  >
                    {emp.department?.department || "No Department"}
                  </td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] px-4 py-1 rounded-lg shadow-md flex items-center gap-2 transition"
                    >
                      <Edit2 size={18} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow-md flex items-center gap-2 transition"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-red-400 font-semibold"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
