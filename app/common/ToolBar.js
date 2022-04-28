import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import ProjectPicker from "./ProjectPicker";

export default ToolBar = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <ProjectPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    width: "100%",
    backgroundColor: colors.toolbar,
    zIndex: 1000,
  },
});
