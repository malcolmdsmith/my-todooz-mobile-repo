import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "../Text";

function PickerItem({
  item,
  onPress,
  textProperty,
  selectedItem,
  bgColor,
  selectedBGColor,
}) {
  const checkSelectedItem = () => {
    if (item === selectedItem) return true;

    if (selectedItem !== null) {
      if (item[textProperty] === selectedItem[textProperty]) return true;
    }

    return false;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: checkSelectedItem() ? selectedBGColor : bgColor },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{item[textProperty]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  text: {
    padding: 5,
    fontWeight: "bold",
    color: colors.black,
    margin: 3,
  },
});

export default PickerItem;
