import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

const AppTextInput = React.forwardRef(
  (
    {
      icon,
      showClearButton,
      onFieldClear,
      textInputWidth = 0,
      bgColor = colors.formField,
      width = "100%",
      ...otherProps
    },
    ref
  ) => {
    return (
      <View style={[styles.container, { width }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={defaultStyles.colors.dark}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={defaultStyles.colors.dark}
          style={[
            defaultStyles.text,
            { marginLeft: 3 },
            { backgroundColor: bgColor },
            { width: textInputWidth === 0 ? "79%" : textInputWidth },
            { zIndex: -1000 },
          ]}
          {...otherProps}
          ref={ref}
        />
        {showClearButton && (
          <MaterialCommunityIcons
            name="close-octagon-outline"
            size={24}
            color={defaultStyles.colors.dark}
            onPress={onFieldClear}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.formField,
    borderRadius: 25,
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 40,
    paddingBottom: 15,
    marginVertical: 10,
    zIndex: -1000,
    elevation: -1000,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
