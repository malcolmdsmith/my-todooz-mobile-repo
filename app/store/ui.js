import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    lastFetch: null,
    currentProject: { project_id: 0, project_name: "[All]" },
  },
  reducers: {
    projectSelected: (ui, action) => {
      //console.info("action.payload...", action.payload);
      ui.currentProject = action.payload;
    },
  },
});

export const { projectSelected } = slice.actions;
export default slice.reducer;

// export const getCurrentProject = createSelector(
//   (state) => state.entities.ui,
//   (projects) => projects.list.filter((project) => project)
// );
