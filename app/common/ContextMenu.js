import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import ContextMenuItem from "./ContextMenuItem";

export default ContextMenu = ({ items }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {items && items.length > 0
        ? items.map((item, index) => (
            <ContextMenuItem item={item} key={index} />
          ))
        : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  dots: {
    fontSize: 20,
  },
});
