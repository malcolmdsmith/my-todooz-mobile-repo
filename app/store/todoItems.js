import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "todoItems",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    todoItemsRequested: (todoItems, action) => {
      todoItems.loading = true;
    },
    todoItemsReceived: (todoItems, action) => {
      todoItems.list = action.payload;
      todoItems.loading = false;
      todoItems.lastFetch = Date.now();
    },
    todoItemsRequestFailed: (todoItems, action) => {
      todoItems.loading = false;
    },
    todoItemAdded: (todoItems, action) => {
      todoItems.list.push({
        item_id: action.payload.item_id,
        todo_text: action.payload.todo_text,
        project_id: action.payload.project_id,
        due_date: action.payload.due_date,
        completed: action.payload.completed,
        owner_id: action.payload.owner_id,
      });
    },
  },
});

export const {
  todoItemAdded,
  todoItemsReceived,
  todoItemsRequested,
  todoItemsRequestFailed,
} = slice.actions;
export default slice.reducer;

const todoItems_url = "/todooz";

//Action Creators
export const loadTodoItems = (owner_id, completed) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.todoItems;
  const { currentProject } = getState().entities.ui;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  //if (diffInMinutes < 1) return;

  let url = `${todoItems_url}/user/all?owner_id=${owner_id}`;
  url = `${url}&project_id=${currentProject.project_id}&completed=${completed}`;
  //console.info(url);

  const result = dispatch(
    apiCallBegan({
      url,
      method: "get",
      data: null,
      onSuccess: todoItemsReceived.type,
      onError: todoItemsRequestFailed.type,
    })
  );
  return result;
};

export const getProjects = createSelector(
  (state) => state.entities.todoItems,
  (todoItems) => todoItems.list.filter((project) => project)
);

export const addTodoItem = (todoItem) => (dispatch, getState) => {
  console.info("todoItem...", todoItem);
  dispatch(
    apiCallBegan({
      url: "/todoItems",
      method: "post",
      data: todoItem,
      onSuccess: todoItemAdded.type,
      onError: todoItemsRequestFailed.type,
    })
  );
  //console.info("result...", result.data);
  dispatch(todoItemAdded(result));
  //return result;
};
