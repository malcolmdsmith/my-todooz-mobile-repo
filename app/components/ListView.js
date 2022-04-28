import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";

import TodoItemsList from "../common/TodoItemsList";

export default ListView = () => {
  return (
    <View style={styles.container}>
      <TodoItemsList width={450} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
