import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./creatSlice";

export default configureStore({
  reducer: {
    mediaApp: mediaReducer,
  },
});
