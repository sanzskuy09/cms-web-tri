/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API, ENDPOINTS } from "@/config/api";

const initialState = {
  loading: false,
  users: [],
  isLogin: false,
  error: "",
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await API.post(ENDPOINTS.AUTH_LOGIN, {
        email,
        password,
      }); // Your login API endpoint
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await axios.get("/api/logout"); // Your logout API endpoint
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You don't need these reducers anymore
    logoutUser: (state, action) => {
      state.loading = false;
      state.users = [];
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isLogin = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       // state.loading = true;
//       state.users = action.payload;
//       state.isLogin = true;
//       state.loading = false;
//     },
//     logoutUser: (state, action) => {
//       // state.loading = true;
//       state.users = [];
//       state.isLogin = false;
//       state.loading = false;
//     },
//   },
// });

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
