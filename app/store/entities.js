import { combineReducers } from "redux";
import projectsReducer from "./projects";
import uiReducer from "./ui";
import todoItemsReducer from "./todoItems";
import authReducer from "./auth";

export default combineReducers({
  projects: projectsReducer,
  ui: uiReducer,
  todoItems: todoItemsReducer,
  auth: authReducer,
});
