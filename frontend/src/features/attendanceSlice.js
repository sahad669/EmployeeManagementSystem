import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

export const markAttendance = createAsyncThunk(
  "attendance/markAttendance",
  async (data) => {
    try {
      const res = await axiosInstants.post("attendance/mark", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);

export const getAttendance = createAsyncThunk(
  "attendance/getAttendance",
  async (employeeId) => {
    try {
      const res = await axiosInstants.get(`attendance/${employeeId}`);
    
      return res.data.attendance;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);
export const deleteAttendance = createAsyncThunk(
  "attendance/deleteAttendance",
  async (attendanceId) => {
    try {
      const res = await axiosInstants.delete(`attendance/delete/${attendanceId}`);
      toast.success(res.data.message);
      return res.data.id
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { records: [],
     loading: false, 
     error: null 
    },

  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.attendance) {
          state.records.push(action.payload.attendance);
        }
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(
          (rec) => rec._id !== action.payload
        );
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
