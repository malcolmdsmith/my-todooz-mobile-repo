import React, { Component, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Screen from "../../../common/Screen";
import ListView from "../../ListView";
import ProjectEditor from "../../ProjectEditor";

export default HomeScreen = () => {
  const [showProjectEditor, setShowProjectEditor] = useState(false);

  return (
    <Screen>
      <ListView />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
