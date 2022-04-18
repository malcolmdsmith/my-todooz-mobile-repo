import React, { Component, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import ContextMenu from "./ContextMenu";

export default TodoItem = ({ index, todoItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.index}>{index}.</Text>
        <Text style={styles.text}>{todoItem.todo_text}</Text>
      </View>
      <ContextMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.todoItem,
    borderRadius: 20,
    padding: 20,
    marginBottom: 3,
  },
  index: {
    marginRight: 5,
  },
  itemTextContainer: {
    flexDirection: "row",
    width: "90%",
  },
  text: {},
});
