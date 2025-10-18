// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstants from "../axiosInstants";
// import toast from "react-hot-toast";

// //register
// export const register = createAsyncThunk("auth/register", async (data) => {
//   try {
//     let res = await axiosInstants.post("/users/register", data);
//     localStorage.setItem("token", res.data.token);
//     toast.success(res.data.message);
//     return res.data;
//   } catch (error) {
//     const message = error.response?.data?.message;
//     toast.error(message);
//   }
// });

// //login
// export const login = createAsyncThunk("auth/login", async (data) => {
//   try {
//     let res = await axiosInstants.post("/users/login", data);
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     toast.success(res.data.message);
//     return res.data;
//   } catch (error) {
//     const message = error.response?.data?.message;
//     toast.error(message);
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, loading: false, error: null },
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       state.user = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // REGISTER
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // LOGIN
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });
// export const { logout,setUser } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const res = await axiosInstants.post("/users/register", data);
    localStorage.setItem("token", res.data.token);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    toast.error(message);
    return { success: false, message };
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstants.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    toast.success(res.data.message);
    return res.data; 
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    toast.error(message);
    return { success: false, message, user: null };
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
  
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null; 
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Registration failed";
      })

    
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Login failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

