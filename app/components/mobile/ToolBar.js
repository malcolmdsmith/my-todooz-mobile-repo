import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal, Image } from "react-native";

import * as RootNavigation from "../mobile/navigation/RootNavigation";
import colors from "../../config/colors";
import RedButton from "../../common/buttons/RedButton";
import UserMenu from "../../common/UserMenu";
import routes from "./navigation/routes";

export default ToolBar = () => {
  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.icon}
            source={require("../../../assets/todoIcon.png")}
          />
          <RedButton
            title="New Todo"
            icon="plus"
            fontSize={10}
            width={150}
            onPress={() =>
              RootNavigation.navigate(routes.TODOITEM, { todoItem: null })
            }
          />
        </View>
        <UserMenu />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 58,
    width: "100%",
    backgroundColor: colors.toolbar,
    zIndex: 1000,
    paddingRight: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    width: 54,
    height: 54,
    marginLeft: 15,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
