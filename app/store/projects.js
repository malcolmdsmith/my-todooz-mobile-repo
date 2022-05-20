import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    projectsRequested: (projects, action) => {
      projects.loading = true;
    },
    projectsReceived: (projects, action) => {
      projects.list = action.payload;
      projects.loading = false;
      projects.lastFetch = Date.now();
    },
    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },
    projectAdded: (projects, action) => {
      projects.list.push({
        project_id: action.payload.project_id,
        project_name: action.payload.project_name,
        owner_id: action.payload.owner_id,
      });
    },
  },
});

export const {
  projectAdded,
  projectsReceived,
  projectsRequested,
  projectsRequestFailed,
} = slice.actions;
export default slice.reducer;

const projects_url = "/projects";

//Action Creators
export const loadProjects = (owner_id) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.projects;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;

  const url = projects_url + "/user/" + owner_id;
  //console.info(url);

  const result = dispatch(
    apiCallBegan({
      url,
      method: "get",
      data: null,
      onSuccess: projectsReceived.type,
      onError: projectsRequestFailed.type,
    })
  );
  //console.info("result...", result);
  return result;
};

export const getProjects = createSelector(
  (state) => state.entities.projects,
  (projects) => projects.list.filter((project) => project)
);

export const getPickerList = createSelector(
  (state) => state.entities.projects,
  (projects) => {
    const projectsWithPrefix = [
      { project_id: 0, project_name: "[All]" },
      ...projects.list,
    ];
    // you could filter here as well before returning
    return projectsWithPrefix;
  }
);

export const addProject = (project) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/projects",
      method: "post",
      data: project,
      onSuccess: projectAdded.type,
      onError: projectsRequestFailed.type,
    })
  );
  //console.info("result...", result.data);
  //dispatch(projectAdded(result));
  //return result;
};
