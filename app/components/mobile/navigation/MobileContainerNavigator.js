import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const MobileContainerNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default MobileContainerNavigator;
