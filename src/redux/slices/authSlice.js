import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const login = createAsyncThunk("auth/login", async (params) => {
  const { data } = await axios.post("/login", params);
  return data;
});

export const register = createAsyncThunk("auth/register", async (params) => {
  const { data } = await axios.post("/register", params);
  return data;
});

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const { data } = await axios.get("/me");
  return data;
});

const initialState = {
  data: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.data = null;
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.data = null;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.data = null;
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.data = null;
      state.loading = false;
    },
    [getMe.pending]: (state, action) => {
      state.data = null;
      state.loading = true;
    },
    [getMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getMe.rejected]: (state, action) => {
      state.data = null;
      state.loading = false;
    },
  },
});

export const isAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
