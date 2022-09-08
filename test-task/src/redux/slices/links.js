import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLink = createAsyncThunk("/fetchLink", async (link) => {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const { data } = await axios.post(`http://79.143.31.216/squeeze`, null, {
    params: {
      link: link,
    },
    headers: headers,
  });
  return data;
});

export const fetchStatistics = createAsyncThunk(
  "links/fetchStatistics",
  async (params) => {
    const rowsPerPage = params.rowsPerPage;
    const dataPage = params.dataPage;
    const sort = params.sort;
    const token = localStorage.getItem("access_token");
    const offset = dataPage * rowsPerPage;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get("http://79.143.31.216/statistics", {
      params: {
        offset,
        limit: rowsPerPage,
        order: sort !== "" ? sort : null,
      },
      headers: headers,
    });
    return data;
  }
);

const initialState = {
  links: {
    items: [],
    status: "loading",
  },
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchStatistics.pending]: (state) => {
      state.links.items = [];
      state.links.status = "loading";
    },
    [fetchStatistics.fulfilled]: (state, action) => {
      state.links.items = action.payload;
      state.links.status = "loaded";
    },
    [fetchStatistics.rejected]: (state) => {
      state.links.items = [];
      state.links.status = "error";
    },
  },
});

export const linksReducer = linksSlice.reducer;

