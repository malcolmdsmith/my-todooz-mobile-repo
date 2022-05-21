import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { isTablet } from "react-native-device-detection";

import configureStore from "./app/store/configureStore";
import TabletContainerNavigator from "./app/components/tablet/navigation/TabletContainerNavigator";
import MobileContainerNavigator from "./app/components/mobile/navigation/MobileContainerNavigator";

export default App = () => {
  const store = configureStore();
  const persistor = persistStore(store);

  store.subscribe(() => {
    console.info("Store Changed!");
  });

  useEffect(() => {
    const loggingIn = async () => {
      console.info("Loggin In...");
      //restoreUser();
    };
    loggingIn();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {isTablet ? (
              <TabletContainerNavigator />
            ) : (
              <MobileContainerNavigator />
            )}
          </NavigationContainer>
        </PersistGate>
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
