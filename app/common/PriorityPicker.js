import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

import defaultStyles from "../config/styles";

export default PriorityPicker = ({ name }) => {
  const { setFieldValue, values } = useFormikContext();

  const getBox = (value, bgcolor, label) => {
    return (
      <TouchableOpacity
        onPress={() => setFieldValue(name, value)}
        style={[
          styles.box,
          {
            backgroundColor:
              value === values[name] ? bgcolor : defaultStyles.colors.formField,
          },
        ]}
      >
        <Text
          style={
            (defaultStyles.text,
            {
              color:
                value === values[name]
                  ? defaultStyles.colors.white
                  : defaultStyles.colors.dark,
            })
          }
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {getBox(1, defaultStyles.colors.priority_1, "HIGH")}
      {getBox(2, defaultStyles.colors.priority_2, "MEDIUM")}
      {getBox(3, defaultStyles.colors.priority_3, "LOW")}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    zIndex: -1000,
    elevation: -1000,
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "31%",
    height: 50,
    margin: 5,
    zIndex: -1000,
    elevation: -1000,
  },
});
