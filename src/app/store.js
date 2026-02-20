import { configureStore } from "@reduxjs/toolkit";
import lawyerSlice from "../features/lawyers/lawyerSlice";

export const store = configureStore({
  reducer: {
    lawyerSlice,
  },
});
