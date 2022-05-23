import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { isTablet } from "react-native-device-detection";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { getDateString } from "../utility/dateFunctions";
import { ScreenWidth } from "../utility/constants";

export default TodoItem = ({ index, todoItem, onEditItem }) => {
  const getColor = () => {
    if (todoItem.priority === 1) return defaultStyles.colors.priority_1;
    if (todoItem.priority === 2) return defaultStyles.colors.priority_2;
    if (todoItem.priority === 3) return defaultStyles.colors.priority_3;
    return defaultStyles.colors.formField;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onEditItem(todoItem)}
    >
      <View style={styles.itemContainer}>
        <View style={[styles.roundedCorners, { backgroundColor: getColor() }]}>
          <Text
            style={[
              defaultStyles.todoText,
              styles.index,
              { backgroundColor: getColor() },
              { color: defaultStyles.colors.white },
              { width: 34 },
            ]}
          >
            {index}.
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              paddingLeft: 10,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <Text style={defaultStyles.todoText}>{todoItem.todo_text}</Text>
            {todoItem.due_date && (
              <Text style={defaultStyles.todoDue}>
                {getDateString(todoItem.due_date)}
              </Text>
            )}
          </View>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => onEditItem(todoItem)}
        style={{ width: 20 }}
      >
        <Text style={defaultStyles.todoDots}>...</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.todoItem,
    borderRadius: 25,
    paddingRight: 30,
    marginBottom: 5,
    width: isTablet ? "100%" : "90%",
  },
  index: {
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 5,
  },
  roundedCorners: {
    flexDirection: "row",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingLeft: 20,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    fontWeight: "bold",
  },
});
