import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

//add department
export const addDepartment = createAsyncThunk(
  "auth/addDepartment",
  async (data) => {
    try {
      let res = await axiosInstants.post("/department/add", data);
      toast.success(res.data.message);
      return res.data.newDepartment;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);
// get all department
export const fetchDepartment = createAsyncThunk(
  "auth/fetchDepartment",
  async () => {
    try {
      let res = await axiosInstants.get("/department/getall");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);

//delete department
export const deleteDepartment = createAsyncThunk(
  "auth/deleteDepartment",
  async (id) => {
    try {
      let res = await axiosInstants.delete(`/department/delete/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  }
);

const departmentSlice = createSlice({
  name: "department",

  initialState: {
    departments: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.departments.push(action.payload);
        }
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (dep) => dep._id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
