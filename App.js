import { Component, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import configureStore from "./app/store/configureStore";
import { logIn } from "./app/api/userApi";
import TabletContainerNavigator from "./app/components/tablet/navigation/TabletContainerNavigator";
import axios from "axios";
import { baseUrl } from "./app/config/settings";

export default App = () => {
  const store = configureStore();

  store.subscribe(() => {
    console.info("Store Changed!");
    console.info(
      "todoItems count...",
      store.getState().entities.todoItems.list.length
    );
    console.info(
      "currentProject...",
      store.getState().entities.ui.currentProject.project_id
    );
    console.info(
      "AddedProject...",
      store.getState().entities.projects.list.length
    );
  });

  useEffect(() => {
    const loggingIn = async () => {
      //console.info("Loggin In...");
      // const result = await axios.request({
      //   url: baseUrl + "/projects/user/2",
      //   method: "get",
      //   data: null,
      // });
      // console.info("result axios...", result.data);
      //await logIn("malcolms65@gmail.com", "123456");
    };
    //await logInClientToken();
    loggingIn();
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <TabletContainerNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "flex-start",
    //justifyContent: "flex-start",
  },
});
