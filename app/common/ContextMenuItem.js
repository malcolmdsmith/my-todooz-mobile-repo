import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import defaultStyles from "../config/styles";

export default ContextMenuItem = (item) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => item.item.onPress()}
    >
      <Text style={[defaultStyles.text]}>{item.item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
