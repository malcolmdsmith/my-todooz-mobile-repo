import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";

import Button from "../Button";
import SubmitButton from "./SubmitButton";
import colors from "../../config/colors";
import CloseButton from "../buttons/CloseButton";
//
function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  resetValues,
  onHandleReset,
  showClearButton,
  onClose,
  onDelete,
  clearButtonIcon = "trash-alt",
  clearButtonTitle = "Clear",
  showSaveButton = false,
  saveButtonTitle = "Save",
  showCloseButton = false,
  showDeleteButton = false,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {(props) => (
        <>
          {children}
          <View style={styles.buttons}>
            {showSaveButton && (
              <SubmitButton title={saveButtonTitle} icon="smile" width="30%" />
            )}
            {showClearButton && (
              <Button
                title={clearButtonTitle}
                icon={clearButtonIcon}
                bgColor={colors.modal}
                color={colors.red}
                borderOnly={true}
                onPress={() => {
                  props.resetForm({ values: resetValues });
                  onHandleReset();
                }}
                width="30%"
              ></Button>
            )}
            {showDeleteButton && (
              <Button
                color={colors.red}
                bgColor={colors.modal}
                onPress={onDelete}
                title="Delete"
                icon="trash-alt"
                borderOnly={true}
                width="30%"
              />
            )}
            {showCloseButton && <CloseButton onClose={onClose} width="30%" />}
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 5,
  },
});
export default AppForm;
