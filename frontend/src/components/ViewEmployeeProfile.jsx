import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../features/employeeSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ViewEmployeeProfile = () => {
  const dispatch = useDispatch();
  const { employeeDetails, loading, error } = useSelector(
    (state) => state.employee
  );
  const { darkMode } = useSelector((state) => state.theme);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  useEffect(() => {
    if (id) dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2
          className={`w-12 h-12 animate-spin ${
            darkMode ? "text-[#FDC500]" : "text-[#FFCC00]"
          }`}
        />
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!employeeDetails)
    return (
      <p
        className={`text-center py-10 ${
          darkMode ? "text-[#FFCC00]" : "text-[#0A0A0A]"
        }`}
      >
        No profile found
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full max-w-2xl mx-auto px-6 py-10 rounded-3xl shadow-2xl border transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#112d4e] via-[#274472] to-[#47CFFF] border-[#198FFF]/40 text-[#A1F6FF]"
          : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#5B99ED]/40 text-[#274472]"
      }`}
      style={{ minHeight: "32rem" }}
    >
      <h2
        className={`text-2xl font-extrabold text-center mb-6 tracking-wide ${
          darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
        }`}
      >
        Welcome, {user?.name || "Employee"} !
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-8 relative">
        <img
          src={employeeDetails.imageurl || "https://via.placeholder.com/200"}
          alt={employeeDetails.name}
          className="w-48 h-48 rounded-full object-cover border-[6px] border-[#47CFFF] shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 -mb-6 bg-[#82E0FA] text-[#112d4e] font-bold uppercase px-6 py-1 rounded-full shadow-md">
          {employeeDetails.role}
        </div>
      </div>

      {/* Details Card */}
      <div
        className={`bg-opacity-70 p-6 rounded-xl backdrop-blur-md shadow-inner ${
          darkMode ? "bg-[#112d4e]" : "bg-[#E3EDF7]"
        }`}
      >
        {/* Name */}
        <div className="flex flex-wrap gap-4 items-center w-full mb-4">
          <span
            className={`font-semibold min-w-[100px] ${
              darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
            }`}
          >
            Name:
          </span>
          <span
            className={`px-3 py-1 rounded-lg ${
              darkMode
                ? "bg-[#274472] text-[#82E0FA]"
                : "bg-[#D9EEFF] text-[#198FFF]"
            }`}
          >
            {employeeDetails.name}
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-wrap gap-4 items-center w-full mb-4">
          <span
            className={`font-semibold min-w-[100px] ${
              darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
            }`}
          >
            Email:
          </span>
          <span
            className={`px-3 py-1 rounded-lg ${
              darkMode
                ? "bg-[#274472] text-[#82E0FA]"
                : "bg-[#D9EEFF] text-[#198FFF]"
            }`}
          >
            {employeeDetails.email}
          </span>
        </div>

        {/* Phone */}
        <div className="flex flex-wrap gap-4 items-center w-full mb-4">
          <span
            className={`font-semibold min-w-[100px] ${
              darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
            }`}
          >
            Phone:
          </span>
          <span
            className={`px-3 py-1 rounded-lg ${
              darkMode
                ? "bg-[#274472] text-[#82E0FA]"
                : "bg-[#D9EEFF] text-[#198FFF]"
            }`}
          >
            {employeeDetails.phone}
          </span>
        </div>

        {/* Role */}
        <div className="flex flex-wrap gap-4 items-center w-full mb-4">
          <span
            className={`font-semibold min-w-[100px] ${
              darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
            }`}
          >
            Role:
          </span>
          <span
            className={`px-3 py-1 rounded-lg ${
              darkMode
                ? "bg-[#274472] text-[#82E0FA]"
                : "bg-[#D9EEFF] text-[#198FFF]"
            }`}
          >
            {employeeDetails.role}
          </span>
        </div>

        {/* Department */}
        <div className="flex flex-wrap gap-4 items-center w-full mb-2">
          <span
            className={`font-semibold min-w-[100px] ${
              darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
            }`}
          >
            Department:
          </span>
          <span
            className={`px-3 py-1 rounded-lg ${
              darkMode
                ? "bg-[#274472] text-[#82E0FA]"
                : "bg-[#D9EEFF] text-[#198FFF]"
            }`}
          >
            {employeeDetails.department?.department || "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewEmployeeProfile;
