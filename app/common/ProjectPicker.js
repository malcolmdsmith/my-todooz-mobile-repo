import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loadProjects, getProjectsList } from "../store/projects";
import { loadTodoItems } from "../store/todoItems";
import { projectSelected } from "../store/ui";
import Button from "./Button";
import Picker from "./picker/Picker";
import colors from "../config/colors";

export default ProjectPicker = () => {
  const [showProjectEditor, setShowProjectEditor] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getProjectsList);
  const selectedProject = useSelector(
    (state) => state.entities.ui.currentProject
  );

  console.info("projs...", projects.length);

  useEffect(() => {
    dispatch(loadProjects(2));
  }, []);

  const handleSelectedProject = (item) => {
    console.info("selectedProjected...", item);
    dispatch(projectSelected(item));
    dispatch(loadTodoItems(2, false));
  };

  const handleNewProject = () => {
    setShowProjectEditor(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Project:</Text>
        <Button
          title="New"
          fontSize={12}
          bgColor={colors.toolbar}
          color={colors.linkText}
          onPress={handleNewProject}
        />
        <Picker
          items={projects}
          selectedItem={selectedProject}
          onSelectItem={handleSelectedProject}
          textProperty="project_name"
          valueProperty="project_id"
          height={projects.length * 34}
          listWidth={200}
          width={180}
        />
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
