import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import qs from "qs";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const username = params.username;
  const password = params.password;
  const { data } = await axios.post(
    `http://79.143.31.216/login`,
    qs.stringify({
      username,
      password,
    })
  );
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const username = params.username;
    const password = params.password;
    const { data } = await axios.post(`http://79.143.31.216/register`, null, {
      params: {
        username,
        password,
      },
    });
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
  isAuth: localStorage.getItem("access_token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.isAuth = true;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.isAuth = true;
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
