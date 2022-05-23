import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RootNavigation from "./RootNavigation";
import HomeScreen from "../screens/HomeScreen";
import TodoItemScreen from "../screens/TodoItemScreen";

const Stack = createStackNavigator();

const MobileContainerNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="TodoItem" component={TodoItemScreen} />
  </Stack.Navigator>
);

export default MobileContainerNavigator;
