import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal, Image } from "react-native";

import colors from "../../config/colors";
import ProjectPicker from "../../common/ProjectPicker";
import RedButton from "../../common/buttons/RedButton";
import TodoItemsEditor from "../TodoItemsEditor";
import UserMenu from "../../common/UserMenu";
import { SortData } from "../../utility/sort";

export default ToolBar = () => {
  const [showTodoItemEditor, setShowTodoItemEditor] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.icon}
            source={require("../../../assets/todoIcon.png")}
          />
          <ProjectPicker />
          <RedButton
            title="New Todo"
            icon="plus"
            fontSize={10}
            width={150}
            onPress={() => setShowTodoItemEditor(true)}
          />
        </View>
        <UserMenu />
      </View>
      <Modal visible={showTodoItemEditor} transparent={true}>
        <View style={styles.modal}>
          <TodoItemsEditor
            onClose={() => setShowTodoItemEditor(false)}
            todoItem={null}
          />
        </View>
      </Modal>
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
