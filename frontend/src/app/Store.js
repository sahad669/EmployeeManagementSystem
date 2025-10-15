import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import departmentReducer from "../features/departmentSlice";
import employeeReducer from "../features/employeeSlice";
import attendanceReducer from "../features/attendanceSlice";
import themeReducer from "../features/themeSlice";
import contactReducer from "../features/contactSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    employee: employeeReducer,
    attendance: attendanceReducer,
    theme: themeReducer,
    messages: contactReducer,
  }
});
