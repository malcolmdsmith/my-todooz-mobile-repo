import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import * as Yup from "yup";
import { isTablet } from "react-native-device-detection";
import { Form, FormField, FormDropDownList } from "../common/forms";
import { FontAwesome5 } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/projects";
import colors from "../config/colors";
import DropShadow from "../common/DropShadow";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
  project_id: Yup.number().optional().label("Project Id"),
  project_name: Yup.string().required().max(40).label("Project Name"),
  project_description: Yup.string().max(255).label("Project Description"),
  project_notes: Yup.string().max(1000).label("Project Notes"),
  parent_project_id: Yup.number().nullable().label("Parent Project"),
  owner_id: Yup.number().optional().label("User"),
});

export default ProjectEditor = ({ onClose }) => {
  const dispatch = useDispatch();
  const [project_name, setProjectName] = useState("");
  const projects = useSelector((state) => state.entities.projects.list);

  const handleSubmit = (data) => {
    dispatch(
      addProject({
        project_name: data.project_name,
        owner_id: 2,
        project_description: data.project_description,
        project_notes: data.project_notes,
        parent_project_id: data.parent_project_id,
      })
    );
  };

  const handleReset = () => {};

  const handleCloseButton = () => {
    onClose();
  };

  return (
    <DropShadow>
      <View style={styles.container}>
        <View>
          <Text style={[defaultStyles.heading]}>
            <FontAwesome5 name="project-diagram" size={18} />
            {"  "} New Project
          </Text>
        </View>
        <Form
          initialValues={{
            project_name: "",
            parent_project_id: null,
            project_notes: "",
            project_description: "",
            owner_id: 0,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          showClearButton={true}
          clearButtonIcon="trash-alt"
          clearButtonTitle="Clear"
          onHandleReset={handleReset}
          onClose={handleCloseButton}
          showSaveButton={true}
          showCloseButton={true}
        >
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="project_name"
            placeholder="Project Name"
          />
          <FormDropDownList
            items={projects}
            name="parent_project_id"
            placeholder="Parent Project"
            icon="project-diagram"
            textProperty="project_name"
            valueProperty="project_id"
            onAddEntry={false}
            width="93%"
            height={52}
            listWidth={530}
            listHeight={250}
            left={-400}
          />
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="project_description"
            placeholder="Project Description"
            multiline={true}
            height={60}
          />
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="project_notes"
            placeholder="Project Notes"
            multiline={true}
            height={120}
            numberOfLines={5}
          />
        </Form>
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modal,
    width: isTablet ? "50%" : "90%",
    borderRadius: 20,
    padding: 20,
  },
});
