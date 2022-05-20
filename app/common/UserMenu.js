import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import ContextMenu from "./ContextMenu";
import DropShadow from "./DropShadow";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default UserMenu = () => {
  const [items, setItems] = useState([]);
  const user = useSelector((state) => state.entities.auth.user);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showSignUpEditor, setShowSignUpEditor] = useState(false);
  const [showSignInEditor, setShowSignInEditor] = useState(false);

  useEffect(() => {
    console.info("user...", user);
    loadMenuItems();
  }, [user]);

  const handleSignIn = () => {
    setShowContextMenu(false);
    setShowSignInEditor(true);
  };

  const handleSignUp = () => {
    setShowContextMenu(false);
    setShowSignUpEditor(true);
  };

  const handleProfile = () => {
    setShowContextMenu(false);
  };

  const handleLogout = () => {
    setShowContextMenu(false);
  };

  const loadMenuItems = () => {
    let items = [];

    if (user === null) {
      items.push({ label: "Sign In", onPress: handleSignIn });
      items.push({ label: "Sign Up", onPress: handleSignUp });
      setShowSignInEditor(true);
    } else {
      items.push({ label: "Profile", onPress: handleProfile });
      items.push({ label: "Log Out", onPress: handleLogout });
    }
    setItems(items);
  };

  const handleToggle = () => {
    setShowContextMenu(!showContextMenu);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[defaultStyles.text]}>{user && user.firstName}</Text>
        <TouchableOpacity onPress={handleToggle} style={styles.circle}>
          <FontAwesome name="user-circle-o" size={30} color={colors.green} />
        </TouchableOpacity>
        {showContextMenu && (
          <DropShadow>
            <View style={styles.contextMenu}>
              <ContextMenu items={items} />
            </View>
          </DropShadow>
        )}
      </View>
      <Modal visible={showSignUpEditor} transparent={true}>
        <View style={styles.modal}>
          <SignUp onClose={() => setShowSignUpEditor(false)} />
        </View>
      </Modal>
      <Modal visible={showSignInEditor} transparent={true}>
        <View style={styles.modal}>
          <SignIn onClose={() => setShowSignInEditor(false)} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  contextMenu: {
    position: "absolute",
    top: 15,
    left: -160,
    width: 200,
    height: 150,
    zIndex: 1000,
    elevation: 1000,
    backgroundColor: colors.list,
    borderRadius: 5,
  },
  circle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgb(98,184,121)",
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
