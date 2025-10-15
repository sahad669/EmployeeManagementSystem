import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

// Add Employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (formData) => {
    try {
      const res = await axiosInstants.post("users/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data.employee;
    } catch (error) {
      const message = error.response?.data?.message || "Error adding employee";
      toast.error(message);
      throw new Error(message);
    }
  }
);

// Fetch All Employees
export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    try {
      let res = await axiosInstants.get("users/getall");

      return res.data.employees;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error fetching employees";
      if (error.response?.status !== 404) toast.error(message);
      throw new Error(message);
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    try {
      let res = await axiosInstants.delete(`/users/delete/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error deleting employee";
      toast.error(message);
      throw new Error(message);
    }
  }
);

// Get Employee By ID
export const getEmployeeById = createAsyncThunk(
  "employee/getEmployeeById",
  async (id) => {
    try {
      let res = await axiosInstants.get(`/users/byid/${id}`);
      return res.data.employee;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error fetching employee";
      toast.error(message);
      throw new Error(message);
    }
  }
);

// Edit Employee
export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, data }) => {
    try {
      let res = await axiosInstants.patch(`/users/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data.employee;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error updating employee";
      toast.error(message);
      throw new Error(message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    employeeDetails: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.employees.push(action.payload);
        }
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Employees
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit Employee
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
  state.loading = false;
  if (action.payload) {
    const index = state.employees.findIndex(
      (emp) => emp._id === action.payload._id
    );
    if (index !== -1) {
      state.employees[index] = action.payload;
    }
    // Update localStorage user
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser._id === action.payload._id) {
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
  }
})
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Employee By ID
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.employeeDetails = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeDetails = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.employeeDetails = null;
      });
  },
});

export default employeeSlice.reducer;
