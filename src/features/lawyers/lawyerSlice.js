import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../constant/BaseUrl";

const initialState = {
  lawyer: {},
  loading: false,
  error: "",
};

export const lawyerSlice = createSlice({
  name: "lawyer",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.loading = true;
      state.lawyer = {};
      state.error = "";
    },

    fetchSuccess: (state, action) => {
      state.loading = false;
      state.lawyer = action.payload;
      state.error = "";
    },

    fetchFailed: (state, action) => {
      state.loading = false;
      state.lawyer = {};
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed } = lawyerSlice.actions;
export const fetchAsync = (id) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const { data } = await axios.get(`${BaseUrl}/pub/lawyers/${id}`);
    dispatch(fetchSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchFailed(error.response?.data?.message || "Gagal mengambil data"),
    );
  }
};

export default lawyerSlice.reducer;
