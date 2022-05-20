import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import { sortTodoItem } from "../utility/sort";

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
      //console.info("todoItemsRecived...");
      const sorted = action.payload.sort(sortTodoItem);
      todoItems.list = sorted;
      todoItems.loading = false;
      todoItems.lastFetch = Date.now();
    },
    todoItemsRequestFailed: (todoItems, action) => {
      todoItems.loading = false;
    },
    todoItemAdded: (todoItems, action) => {
      //console.info("action...", action);
      todoItems.list.push({
        item_id: action.payload.item_id,
        todo_text: action.payload.todo_text,
        project_id: action.payload.project_id,
        due_date: action.payload.due_date,
        completed: action.payload.completed,
        priority: action.payload.priority,
        owner_id: action.payload.owner_id,
      });

      todoItems.list.sort(sortTodoItem);
    },
    todoItemEdited: (todoItems, action) => {
      const items = todoItems.list.filter(
        (item) => item.item_id !== action.payload.item_id
      );

      if (action.payload.completed) todoItems.list = [...items];
      else todoItems.list = [...items, action.payload];

      todoItems.list.sort(sortTodoItem);
    },
    todoItemDeleted: (todoItems, action) => {
      const index = todoItems.list.findIndex(
        (item) => item.item_id === action.payload.item_id
      );
      todoItems.list.splice(index, 1);
      todoItems.list.sort(sortTodoItem);
    },
  },
});

export const {
  todoItemAdded,
  todoItemEdited,
  todoItemDeleted,
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

  //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
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
  dispatch(
    apiCallBegan({
      url: "/todooz",
      method: "post",
      data: todoItem,
      onSuccess: todoItemAdded.type,
      onError: todoItemsRequestFailed.type,
    })
  );
};

export const updateTodoItem = (todoItem) => (dispatch, getState) => {
  const id = todoItem.item_id;
  const item = { ...todoItem };
  delete item.item_id;
  const url = "/todooz/" + id;

  dispatch(
    apiCallBegan({
      url: url,
      method: "put",
      data: item,
      onSuccess: todoItemEdited.type,
      onError: todoItemsRequestFailed.type,
    })
  );
};

export const deleteTodoItem = (todoItem) => (dispatch, getState) => {
  const id = todoItem.item_id;
  //const item = { ...todoItem };
  //delete item.item_id;
  const url = "/todooz/" + id;
  dispatch(
    apiCallBegan({
      url: url,
      method: "delete",
      data: todoItem,
      onSuccess: todoItemDeleted.type,
      onError: todoItemsRequestFailed.type,
    })
  );
};
