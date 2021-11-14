import { configureStore } from "@reduxjs/toolkit";
import spotify from "./spotify";

export default configureStore({
  reducer: {
    spotify,
  },
});
