import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import colors from "../config/colors";

import Text from "./Text";

function PickerItem({ item, onPress, textProperty }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{item[textProperty]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    width: 180,
    //backgroundColor: "rgb(240, 179, 179)",
    color: colors.black,
    margin: 3,
  },
});

export default PickerItem;
