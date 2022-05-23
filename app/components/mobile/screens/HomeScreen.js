import React, { Component, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Screen from "./Screen";
//import ProjectEditor from "../../ProjectEditor";
import TodoItemsList from "../../../common/TodoItemsList";
import * as RootNavigation from "../../mobile/navigation/RootNavigation";
import routes from "../navigation/routes";

export default HomeScreen = () => {
  //  const [showProjectEditor, setShowProjectEditor] = useState(false);

  const handleEditTodoItem = (item) => {
    RootNavigation.navigate(routes.TODOITEM, { todoItem: item });
  };

  return (
    <Screen>
      <TodoItemsList onEditItem={handleEditTodoItem} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
