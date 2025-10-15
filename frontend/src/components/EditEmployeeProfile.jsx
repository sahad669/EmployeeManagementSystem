import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, editEmployee } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const EditEmployeeProfile = () => {
  const dispatch = useDispatch();
  const { employeeDetails, loading } = useSelector((state) => state.employee);
  const { darkMode } = useSelector((state) => state.theme);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (employeeDetails) {
      setFormData({
        name: employeeDetails.name,
        email: employeeDetails.email,
        phone: employeeDetails.phone,
        password: "",
      });
    }
  }, [employeeDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    if (image) fd.append("image", image);

    await dispatch(editEmployee({ id, data: fd }));
    dispatch(getEmployeeById(id));
  };

  if (!employeeDetails)
    return (
      <Loader2
        className={`animate-spin w-10 h-10 mx-auto mt-20 ${
          darkMode ? "text-[#47CFFF]" : "text-[#198FFF]"
        }`}
      />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-4xl mx-auto px-4 py-10 space-y-10 rounded-2xl shadow-2xl border transition-colors duration-300 ${
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
          Edit your Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full Name"
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="New Password"
            className={`p-4 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] placeholder-[#7DB9DB] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] placeholder-[#8AAEDC] focus:ring-[#198FFF]"
            }`}
          />
        </div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className={`p-4 rounded-lg border w-full mb-6 transition focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
              : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#47CFFF] hover:bg-[#82E0FA] text-[#112d4e] text-lg font-semibold py-3 rounded-lg shadow-md transition"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5 mx-auto" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default EditEmployeeProfile;
