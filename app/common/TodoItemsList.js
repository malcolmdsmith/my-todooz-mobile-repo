import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loadTodoItems } from "../store/todoItems";
import TodoItem from "../common/TodoItem";
import { sortTodoItem } from "../utility/sort";

export default TodoItemsList = ({ width, onEditItem }) => {
  const dispatch = useDispatch();
  let todoItems = useSelector((state) => state.entities.todoItems.list);
  const user = useSelector((state) => state.entities.auth.user);
  const [showTodoItemEditor, setShowTodoItemEditor] = useState(false);
  const [todoItemToEdit, setTodoItemToEdit] = useState(null);

  useEffect(() => {
    if (user) dispatch(loadTodoItems(user && user.id, false));
  }, [user]);

  const handleEditItem = (item) => {
    onEditItem(item);
  };

  const handleCloseEditor = () => {
    setTodoItemToEdit(null);
    setShowTodoItemEditor(false);
  };

  const getSorted = () => {
    const items = [...todoItems];
    return items.sort(sortTodoItem);
  };

  return (
    <>
      <ScrollView>
        <View style={[styles.container, { width: width }]}>
          {todoItems.map((item, index) => (
            <TodoItem
              key={index}
              index={index + 1}
              todoItem={item}
              onEditItem={handleEditItem}
            />
          ))}
        </View>
      </ScrollView>
      <Modal visible={showTodoItemEditor} transparent={true}>
        <View style={styles.modal}>
          <TodoItemsEditor
            todoItem={todoItemToEdit}
            onClose={handleCloseEditor}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
