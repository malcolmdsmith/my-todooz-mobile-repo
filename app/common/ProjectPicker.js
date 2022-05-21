import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loadProjects, getPickerList } from "../store/projects";
import { loadTodoItems } from "../store/todoItems";
import { projectSelected } from "../store/ui";
import BlueButton from "./buttons/BlueButton";
import FlatListPicker from "./picker/FlatListPicker";
import defaultStyles from "../config/styles";

export default ProjectPicker = () => {
  const [showProjectEditor, setShowProjectEditor] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getPickerList);
  const selectedProject = useSelector(
    (state) => state.entities.ui.currentProject
  );
  const user = useSelector((state) => state.entities.auth.user);

  useEffect(() => {
    if (user) dispatch(loadProjects(user && user.id));
  }, [user]);

  const handleSelectedProject = (item) => {
    dispatch(projectSelected(item));
    dispatch(loadTodoItems(2, false));
  };

  const handleNewProject = () => {
    setShowProjectEditor(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[defaultStyles.text]}>Project: </Text>
        <FlatListPicker
          items={projects}
          selectedItem={selectedProject}
          onSelectItem={handleSelectedProject}
          textProperty="project_name"
          valueProperty="project_id"
          listHeight={300}
          listWidth={380}
          width={220}
          height={40}
          bgColor={defaultStyles.colors.list}
          selectedBGColor={defaultStyles.colors.selectedListItem}
        />
        <View style={{ marginLeft: 60 }}>
          <BlueButton
            title="New"
            icon="plus"
            width={100}
            onPress={handleNewProject}
          />
        </View>
      </View>
      <Modal visible={showProjectEditor} transparent={true}>
        <View style={styles.modal}>
          <ProjectEditor onClose={() => setShowProjectEditor(false)} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    //width: 440,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginRight: 0,
  },
});
