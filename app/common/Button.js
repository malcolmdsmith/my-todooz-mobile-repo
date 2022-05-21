import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
//import DropShadow from "react-native-drop-shadow";
import defaultStyles from "../config/styles";

function AppButton({
  title,
  onPress,
  width,
  color = defaultStyles.colors.black,
  bgColor = defaultStyles.colors.primary,
  fontSize = 14,
  icon = "",
  iconAfter = false,
  iconSize = 14,
  borderOnly = false,
}) {
  const getButton = (iconAfter, title, icon) => {
    if (iconAfter)
      return (
        <Text>
          {title} <FontAwesome5 name={icon} size={iconSize} />
        </Text>
      );
    else
      return (
        <Text>
          <FontAwesome5 name={icon} size={iconSize} /> {title}
        </Text>
      );
  };

  return (
    // <DropShadow style={styles.shadowProp}>
    <TouchableOpacity
      style={[
        defaultStyles.button,
        styles.button,
        { backgroundColor: bgColor },
        { width: width },
        { borderWidth: borderOnly ? 2 : 0 },
        { borderColor: borderOnly ? color : bgColor },
        { zIndex: -1000 },
      ]}
      onPress={onPress}
    >
      {icon != "" ? (
        <Text style={[styles.text, { fontSize: fontSize }, { color: color }]}>
          {getButton(iconAfter, title, icon)}
        </Text>
      ) : (
        <Text style={[styles.text, { fontSize: fontSize }, { color: color }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
    // </DropShadow>
  );
}

const styles = StyleSheet.create({
  button: {
    //backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    elevation: -1000,
    zIndex: -1000,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
