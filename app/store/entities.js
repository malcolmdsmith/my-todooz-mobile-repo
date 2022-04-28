import { combineReducers } from "redux";
import projectsReducer from "./projects";
import uiReducer from "./ui";
import todoItemsReducer from "./todoItems";

export default combineReducers({
  projects: projectsReducer,
  ui: uiReducer,
  todoItems: todoItemsReducer,
});
