import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import * as Yup from "yup";
import { isTablet } from "react-native-device-detection";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { parse, isDate, isValid } from "date-fns";
import { Form, FormField, FormDropDownList } from "../common/forms";
import PriorityPicker from "../common/PriorityPicker";
import {
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from "../store/todoItems";
import colors from "../config/colors";
import DropShadow from "../common/DropShadow";
import defaultStyles from "../config/styles";
import DatePicker from "../common/datePicker/DatePicker";
import moment from "moment";
import { ScreenWidth } from "../utility/constants";

const validationSchema = Yup.object().shape({
  item_id: Yup.number().optional().label("Item Id"),
  todo_text: Yup.string().required().max(255).label("Todo"),
  due_date: Yup.string()
    .test("val", "Invalid date.", (value) => {
      if (value) {
        return moment(value, "DD-MM-YYYY").isValid();
      }
      return true;
    })
    .nullable()
    .label("Due Date"),
  completed: Yup.string()
    .test("val", "Invalid date.", (value) => {
      if (value) {
        return moment(value, "DD-MM-YYYY").isValid();
      }
      return true;
    })
    .nullable()
    .label("Completed"),
  project_id: Yup.number().required().label("Project"),
  priority: Yup.number().required().label("Priority"),
  owner_id: Yup.number().optional().label("User"),
});

export default TodoItemsEditor = ({ onClose, todoItem }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.entities.projects.list);
  const user = useSelector((state) => state.entities.auth.user);
  const [heading, setHeading] = useState(
    todoItem === null ? "New Todo Item" : "Edit Todo Item"
  );

  const handleSubmit = (data, { resetForm }) => {
    console.info("data...", data);
    if (data.item_id) {
      dispatch(updateTodoItem(data));
    } else {
      dispatch(
        addTodoItem({
          todo_text: data.todo_text,
          owner_id: user.id,
          due_date: data.due_date,
          completed: data.completed,
          priority: data.priority,
          project_id: data.project_id,
        })
      );
    }

    resetForm();
  };

  const handleReset = () => {
    //console.info("handeReset");
  };

  const handleCloseButton = () => {
    onClose();
  };

  const handleDeleteButton = () => {
    //console.info("Delete");
    dispatch(deleteTodoItem(todoItem));
    onClose();
  };

  const InitialiseTodoItem = () => {
    let item = {};
    if (todoItem === null) {
      item = {
        todo_text: "",
        project_id: projects[0].project_id,
        due_date: null,
        completed: null,
        priority: 3,
        owner_id: 0,
      };
    } else {
      item = todoItem;
    }
    return item;
  };

  const showDeleteButton = () => {
    const item = InitialiseTodoItem();
    if (item.item_id) return true;
    return false;
  };

  const handleDatePicked = (date) => {};

  const getToday = () => {
    return moment().format("DD-MM-YYYY");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[defaultStyles.heading]}>
          <FontAwesome5 name="list" size={18} />
          {"  "} {heading}
        </Text>
      </View>
      <Form
        initialValues={InitialiseTodoItem()}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        showDeleteButton={showDeleteButton()}
        showClearButton={!showDeleteButton()}
        clearButtonIcon="trash-alt"
        clearButtonTitle="Clear"
        //onHandleReset={handleReset}
        onClose={handleCloseButton}
        onDelete={handleDeleteButton}
        showSaveButton={true}
        showCloseButton={true}
      >
        <FormDropDownList
          items={projects}
          name="project_id"
          placeholder="Project"
          icon="project-diagram"
          textProperty="project_name"
          valueProperty="project_id"
          onAddEntry={false}
          width="93%"
          height={60}
          listWidth={400}
          listHeight={200}
          left={-400}
        />
        <FormField
          autoCorrect={false}
          icon="pencil"
          name="todo_text"
          placeholder="Todo"
          multiline={true}
          height={120}
        />
        <PriorityPicker name="priority" />
        <View style={styles.datePicker}>
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="due_date"
            placeholder="Due Date"
            width="75%"
            showClearButton={true}
            defaultValue={null}
          />
          <DatePicker
            name="due_date"
            showIcon={true}
            onDaySelected={handleDatePicked}
          />
        </View>
        <View style={styles.datePicker}>
          <FormField
            autoCorrect={false}
            icon="pencil"
            name="completed"
            placeholder="Completed"
            width="75%"
            showClearButton={true}
            defaultValue={null}
          />
          <DatePicker
            name="completed"
            showIcon={true}
            onDaySelected={handleDatePicked}
          />
        </View>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modal,
    width: isTablet ? "50%" : "100%",
    borderRadius: isTablet ? 20 : 0,
    paddingTop: isTablet ? 5 : 30,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
});
