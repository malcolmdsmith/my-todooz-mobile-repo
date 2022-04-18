import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ContextMenu = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.dots}>...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  dots: {
    fontSize: 20,
  },
});
