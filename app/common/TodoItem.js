import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import defaultStyles from "../config/styles";
import { getDateString } from "../utility/dateFunctions";

export default TodoItem = ({ index, todoItem, onEditItem }) => {
  const getColor = () => {
    //console.info("priority...", todoItem.priority);
    if (todoItem.priority === 1) return defaultStyles.colors.priority_1;
    if (todoItem.priority === 2) return defaultStyles.colors.priority_2;
    if (todoItem.priority === 3) return defaultStyles.colors.priority_3;
    return defaultStyles.colors.formField;
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemTextContainer}>
        <View style={[styles.roundedCorners, { backgroundColor: getColor() }]}>
          <Text
            style={[
              defaultStyles.todoText,
              styles.index,
              { backgroundColor: getColor() },
              { color: defaultStyles.colors.white },
              { width: 42 },
            ]}
          >
            {index}.
          </Text>
        </View>
        <View>
          <Text style={defaultStyles.todoText}>{todoItem.todo_text}</Text>
          {todoItem.due_date && (
            <Text style={defaultStyles.todoDue}>
              {getDateString(todoItem.due_date)}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onEditItem(todoItem)}
        style={{ width: 20 }}
      >
        <Text style={defaultStyles.todoDots}>...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.todoItem,
    borderRadius: 25,
    paddingRight: 20,
    marginBottom: 5,
    //paddingLeft: 20,
  },
  index: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 10,
  },
  roundedCorners: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingLeft: 20,
    marginRight: 10,
  },
  itemTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 320,
  },
  text: {
    fontWeight: "bold",
  },
});
