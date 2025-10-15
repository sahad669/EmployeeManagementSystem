
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  markAttendance,
  getAttendance,
  deleteAttendance,
} from "../features/attendanceSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Attendance = ({ employeeId, role }) => {
  const dispatch = useDispatch();
  const { records: attendance, loading } = useSelector(
    (state) => state.attendance
  );
  const { darkMode } = useSelector((state) => state.theme);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch attendance
  useEffect(() => {
    if (role === "admin") {
      dispatch(getAttendance("all?role=admin"));
    } else if (employeeId) {
      dispatch(getAttendance(`${employeeId}?role=employee`));
    }
  }, [dispatch, employeeId, role]);

  const handleAttendance = (status) => {
    dispatch(
      markAttendance({ employee: employeeId, status, date: selectedDate })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteAttendance(id));
  };

  // Filtering for Admin
  const filteredAttendanceRecords =
    role === "admin"
      ? attendance?.filter((record) => {
          const matchesSearch = record.employee?.name
            ?.toLowerCase()
            .includes(search);
          const matchesStatus =
            statusFilter === "" || record.status === statusFilter;
          return matchesSearch && matchesStatus;
        })
      : attendance;

  // Chart data calculations
  const presentCount = filteredAttendanceRecords?.filter(
    (a) => a.status === "Present"
  ).length;
  const absentCount = filteredAttendanceRecords?.filter(
    (a) => a.status === "Absent"
  ).length;

  const pieData = [
    { name: "Present", value: presentCount || 0 },
    { name: "Absent", value: absentCount || 0 },
  ];

  let barData = [];
  if (role === "admin") {
    const employeeStats = {};
    filteredAttendanceRecords?.forEach((record) => {
      const name = record.employee?.name || "Unknown";
      if (!employeeStats[name]) {
        employeeStats[name] = { Present: 0, Absent: 0 };
      }
      employeeStats[name][record.status] =
        (employeeStats[name][record.status] || 0) + 1;
    });
    barData = Object.keys(employeeStats).map((name) => ({
      name,
      Present: employeeStats[name].Present,
      Absent: employeeStats[name].Absent,
    }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-6xl mx-auto p-8 rounded-2xl shadow-2xl border transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#112d4e] via-[#274472] to-[#47CFFF] border-[#198FFF]/40 text-[#A1F6FF]"
          : "bg-gradient-to-br from-[#E3EDF7] via-[#A5CDF2] to-[#7DF9FF] border-[#5B99ED]/40 text-[#274472]"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-8 text-center ${
          darkMode ? "text-[#82E0FA]" : "text-[#274472]"
        }`}
      >
        Attendance Records
      </h2>

      {/* Employee date picker + mark buttons */}
      {role === "employee" && (
        <div className="flex gap-4 mb-6 items-center justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
            }`}
          />
          <button
            onClick={() => handleAttendance("Present")}
            className="px-4 py-2 rounded-lg bg-[#38bdf8] hover:bg-[#82E0FA] text-[#112d4e] font-semibold transition shadow"
          >
            Mark Present
          </button>
          <button
            onClick={() => handleAttendance("Absent")}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow"
          >
            Mark Absent
          </button>
        </div>
      )}

      {/* Admin Search + Filter */}
      {role === "admin" && (
        <div className="flex gap-4 mb-8 items-center justify-center">
          <input
            type="text"
            placeholder="Search by employee name"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className={`p-3 rounded-lg border w-1/3 transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
            }`}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`p-3 rounded-lg border transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-[#274472] border-[#198FFF] text-[#A1F6FF] focus:ring-[#47CFFF]"
                : "bg-[#F6FAFF] border-[#5B99ED] text-[#274472] focus:ring-[#198FFF]"
            }`}
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      )}

      {/* Attendance Table */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2
            className={`w-10 h-10 animate-spin ${
              darkMode ? "text-[#47CFFF]" : "text-[#198FFF]"
            }`}
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full border-collapse table-auto text-sm">
            <thead
              className={`text-xs uppercase ${
                darkMode
                  ? "bg-gradient-to-r from-[#198FFF] to-[#47CFFF] text-[#112d4e]"
                  : "bg-gradient-to-r from-[#5B99ED] to-[#A5CDF2] text-[#21314A]"
              }`}
            >
              <tr>
                <th className="p-3 text-left font-semibold">Employee</th>
                <th className="p-3 text-left font-semibold">Email</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">Date</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceRecords?.length > 0 ? (
                filteredAttendanceRecords.map((record, idx) => (
                  <tr
                    key={record._id}
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
                      {record.employee?.name || "N/A"}
                    </td>
                    <td
                      className={`p-3 ${
                        darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                      }`}
                    >
                      {record.employee?.email || "N/A"}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        record.status === "Present"
                          ? "text-[#38bdf8]"
                          : "text-red-500"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td
                      className={`p-3 ${
                        darkMode ? "text-[#A1F6FF]" : "text-[#274472]"
                      }`}
                    >
                      {record.date
                        ? new Date(record.date).toLocaleDateString()
                        : "Invalid Date"}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow mx-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-md py-4 text-red-400 font-semibold"
                  >
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart Section: Always Centered */}
      <div className="my-10 flex justify-center items-center w-full">
        {role !== "admin" && (
          <div className="p-4 bg-white/10 rounded-xl shadow-lg flex justify-center items-center w-full max-w-md">
            <div className="w-full">
              <h3 className="text-center font-semibold mb-2 text-white">
                Present vs Absent
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#38bdf8" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="p-4 bg-white/10 rounded-xl shadow-lg flex justify-center items-center w-full max-w-2xl">
            <div className="w-full">
              <h3 className="text-center font-semibold mb-2">
                Attendance by Employee
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Present" fill="#38bdf8" />
                  <Bar dataKey="Absent" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Attendance;

