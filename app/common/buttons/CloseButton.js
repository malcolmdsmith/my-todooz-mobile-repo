import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Button from "../Button";

export default CloseButton = ({ onClose }) => {
  return (
    <Button
      title="Close"
      icon="window-close"
      bgColor={colors.modal}
      borderOnly={true}
      width={140}
      onPress={onClose}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
