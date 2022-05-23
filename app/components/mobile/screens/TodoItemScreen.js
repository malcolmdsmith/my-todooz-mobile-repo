import React, { Component, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Screen from "./Screen";
import TodoItemsEditor from "../../../components/TodoItemsEditor";
import todoItems from "../../../store/todoItems";
import * as RootNavigation from "../navigation/RootNavigation";
import routes from "../navigation/routes";

export default TodoItemScreen = (navigation) => {
  const handleEditorClose = () => {
    RootNavigation.navigate(routes.HOME);
  };

  return (
    <TodoItemsEditor
      onClose={handleEditorClose}
      todoItem={navigation.route.params.todoItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
