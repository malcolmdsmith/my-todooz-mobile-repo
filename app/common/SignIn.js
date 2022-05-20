import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { isTablet } from "react-native-device-detection";

import { authenticateUser } from "../store/auth";
import { Form, FormField } from "./forms";
import Picker from "./picker/Picker";
import DropShadow from "./DropShadow";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().max(255).label("Email"),
  password: Yup.string().required().label("Password"),
});

export default SignIn = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(authenticateUser(data.username, data.password));
    onClose();
  };

  return (
    <DropShadow>
      <View style={styles.container}>
        <Form
          initialValues={{
            username: "malcolms65@gmail.com",
            password: "123456",
          }}
          showSaveButton={true}
          saveButtonTitle="Submit"
          showClearButton={true}
          showCloseButton={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          onClose={onClose}
        >
          <FormField
            name="username"
            autoCorrect={false}
            icon="pencil"
            placeholder="Email"
          />
          <FormField
            name="password"
            autoCorrect={false}
            icon="pencil"
            placeholder="Password"
            secureTextEntry={true}
          />
        </Form>
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.toolbar,
    borderRadius: 25,
    padding: 20,
    width: isTablet ? "50%" : "90%",
  },
});
