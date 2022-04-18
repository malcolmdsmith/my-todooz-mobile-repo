import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { logIn } from "./app/api/userApi";
import Screen from "./app/common/Screen";
import TodoItemsList from "./app/common/TodoItemsList";

export default class App extends Component {
  // state = {
  //   cntr: 0,
  // };

  async componentDidMount() {
    await logIn("malcolms65@gmail.com", "123456");
    //await logInClientToken();
  }

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <TodoItemsList width={450} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
