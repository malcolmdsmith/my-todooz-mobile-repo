import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { getTodoItems } from "../api/todoItemsApi";
import { getCurrentUser } from "../api/userApi";
import TodoItem from "./TodoItem";

export default TodoItemsList = ({ width }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => await loadList())();
  }, []);

  const loadList = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) return;
      const list = await getTodoItems(user.id);
      console.info(list);
      setItems(list);
    } catch (err) {
      console.log("...", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { width: width }]}>
        {items.map((item, index) => (
          <TodoItem key={index} index={index + 1} todoItem={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
