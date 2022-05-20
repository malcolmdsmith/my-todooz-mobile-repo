import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default PickerDay = ({ item, onDaySelected }) => {
  const getActiveCell = () => {
    if (item.selected) return <Text style={styles.selected}>{item.day}</Text>;
    else if (item.today) return <Text style={styles.today}>{item.day}</Text>;
    else return <Text style={styles.text}>{item.day}</Text>;
  };

  return (
    <TouchableOpacity
      style={
        item.selected
          ? [styles.container, styles.selected]
          : item.today
          ? [styles.container, styles.today]
          : styles.container
      }
      onPress={() => onDaySelected(item)}
    >
      {getActiveCell()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  selected: {
    backgroundColor: colors.blue,
    color: colors.white,
    fontWeight: "bold",
    borderRadius: 8,
  },
  text: {
    color: colors.black,
  },
  today: {
    backgroundColor: colors.orange,
    color: colors.white,
    fontWeight: "bold",
    borderRadius: 8,
  },
});
