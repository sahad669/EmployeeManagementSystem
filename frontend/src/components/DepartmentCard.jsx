import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment, deleteDepartment } from "../features/departmentSlice";
import { Building2, Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const DepartmentCards = () => {
  const dispatch = useDispatch();
  const { departments, loading } = useSelector((state) => state.department);
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  
  const handleDelete = (id) => {
    dispatch(deleteDepartment(id));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2
          className={`w-10 h-10 animate-spin ${
            darkMode ? "text-[#47CFFF]" : "text-[#198FFF]"
          }`}
        />
      </div>
    );

  if (departments.length === 0)
    return (
      <p
        className={`text-center mt-10 text-lg font-semibold ${
          darkMode ? "text-red-500" : "text-red-500"
        }`}
      >
        No departments exist yet.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mx-auto py-6 transition-colors duration-300">
      {departments.map((dep) => (
        <motion.div
          key={dep._id}
          whileHover={{ scale: 1.04, boxShadow: "0 0 32px #82E0FA33" }}
          className={`rounded-3xl shadow-xl transition-shadow border-2 p-7 h-56 flex flex-col justify-between ${
            darkMode
              ? "bg-gradient-to-r from-[#112d4e] via-[#274472] to-[#47CFFF] border-[#82E0FA]"
              : "bg-gradient-to-r from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#A5CDF2]"
          }`}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`flex items-center justify-center rounded-xl shadow-md ${
                  darkMode
                    ? "bg-[#198FFF]/30 text-[#82E0FA]"
                    : "bg-[#A5CDF2]/40 text-[#198FFF]"
                } p-3`}
              >
                <Building2 size={32} />
              </span>
              <h1
                className={`text-xl font-extrabold tracking-wide ${
                  darkMode ? "text-[#82E0FA]" : "text-[#198FFF]"
                }`}
              >
                {dep.department}
              </h1>
            </div>
            <p
              className={`mt-2 text-base max-h-16 overflow-hidden text-ellipsis font-medium ${
                darkMode ? "text-[#A1F6FF]/80" : "text-[#274472]/90"
              }`}
            >
              {dep.description}
            </p>
          </div>

          {/* ✅ Delete Button */}
          <button
            onClick={() => handleDelete(dep._id)}
            className="flex items-center gap-2 justify-center mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default DepartmentCards;
