import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { isTablet } from "react-native-device-detection";

import { addUser } from "../store/auth";
import { Form, FormField } from "./forms";
import Picker from "./picker/Picker";
import DropShadow from "./DropShadow";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
  id: Yup.number().optional().label("User Id"),
  firstName: Yup.string().required().max(255).label("First Name"),
  lastName: Yup.string().required().max(255).label("Last Name"),
  username: Yup.string().required().max(255).label("Email"),
  //role: Yup.string().max(20).default("user").label("Role"),
  password: Yup.string().required().label("Password"),
  passwordConfirmation: Yup.string()
    .required()
    .min(6)
    .label("Password Confirmation")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

const roles = [{ role: "user" }, { role: "admin" }];

export default SignUp = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    data.role = "user";
    console.info("data...", data);
    dispatch(addUser(data));
    onClose();
  };

  return (
    <DropShadow>
      <View style={styles.container}>
        <Form
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            role: "",
            password: "",
            passwordConfirmation: "",
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
            name="firstName"
            autoCorrect={false}
            icon="pencil"
            placeholder="First Name"
          />
          <FormField
            name="lastName"
            autoCorrect={false}
            icon="pencil"
            placeholder="Last name"
          />
          {/* <Picker
            items={roles}
            icon="clipboard-list-outline"
            numberOfColumns={1}
            placeholder="Role"
            submitOnSelect={false}
            selectedItem="user"
            textProperty="role"
            valueProperty="role"
          /> */}
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
          <FormField
            name="passwordConfirmation"
            autoCorrect={false}
            icon="pencil"
            placeholder="Password confirmation"
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
