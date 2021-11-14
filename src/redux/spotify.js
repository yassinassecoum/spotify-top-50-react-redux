import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  tracks: [],
};

export const spotify = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
  },
});

export const { setToken, setTracks } = spotify.actions;

export default spotify.reducer;
