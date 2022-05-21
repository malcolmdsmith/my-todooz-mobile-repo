import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import { isTablet } from "react-native-device-detection";
import colors from "../../../config/colors";
import { Fragment } from "react";
import ToolBar from "../../../common/ToolBar";
//import Menu from "./Menu";

function Screen({ children, style, navigation }) {
  return (
    <Fragment>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: colors.screen_background }}
      ></SafeAreaView>
      <ToolBar />
      <SafeAreaView style={[styles.screen, style]}>
        {/* <Menu navigation={navigation} /> */}
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 20,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    //backgroundColor: colors.white,
    backgroundColor: colors.screen_background,
    zIndex: -1000,
  },
  view: {
    flex: 1,
    paddingLeft: isTablet || Platform.OS === "ios" ? 20 : 0,
    paddingRight: isTablet || Platform.OS === "ios" ? 20 : 0,
    backgroundColor: colors.screen_background,
    paddingTop: 20,
  },
});

export default Screen;
