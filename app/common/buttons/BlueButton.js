import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Button from "../Button";

export default BlueButton = ({ title, icon, width, onPress }) => {
  return (
    <Button
      title={title}
      icon={icon}
      bgColor={colors.modal}
      borderOnly={true}
      color={colors.blue}
      width={width}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
