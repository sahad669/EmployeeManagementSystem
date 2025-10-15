import attendanceModel from "../models/attendanceModel.js";

export const markAttendance = async (req, res) => {
  try {
    const { employee, status, date } = req.body;
    const saved = await attendanceModel.findOneAndUpdate(
      { employee, date }, 
      { status },         
      { upsert: true, new: true }
    ).populate("employee", "name email"); 

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      attendance: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking attendance",
      error: error.message,
    });
  }
};

// ✅ Get Attendance for Employee
export const getAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const { role } = req.query;        

    let records;
    if (role === "admin") {
      // Admin see all attendance records
      records = await attendanceModel
        .find()
        .populate("employee", "name email")
        .sort({ date: -1 });
    } else {
      // Employee see only their own records
      records = await attendanceModel
        .find({ employee: employeeId })
        .populate("employee", "name email")
        .sort({ date: -1 });
    }

    res.status(200).json({
      success: true,
      attendance: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
      error: error.message,
    });
  }
};

//attendance delete
export const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedRecord = await attendanceModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
      id: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting attendance record",
      error: error.message,
    });
  }
};