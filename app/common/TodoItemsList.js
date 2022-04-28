import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loadTodoItems } from "../store/todoItems";
import TodoItem from "../common/TodoItem";

export default TodoItemsList = ({ width }) => {
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.entities.todoItems.list);

  useEffect(() => {
    dispatch(loadTodoItems(2, false));
  }, []);

  console.info("items...", todoItems.length);
  return (
    <ScrollView>
      <View style={[styles.container, { width: width }]}>
        {todoItems.map((item, index) => (
          <TodoItem key={index} index={index + 1} todoItem={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
