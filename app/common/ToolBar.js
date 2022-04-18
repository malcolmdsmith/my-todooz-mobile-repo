import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

export default ToolBar = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    backgroundColor: colors.toolbar,
  },
});
