import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";

import Button from "../Button";
import SubmitButton from "./SubmitButton";
import colors from "../../config/colors";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  resetValues,
  onHandleReset,
  showClearButton,
  clearButtonTitle,
  clearButtonIcon,
  showSaveButton = false,
  saveButtonTitle = "Save",
  showCloseButton = false,
  onClose,
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
              <SubmitButton title={saveButtonTitle} icon="smile" width={140} />
            )}
            {showClearButton && (
              <Button
                title={clearButtonTitle}
                icon={clearButtonIcon}
                onPress={() => {
                  props.resetForm({ values: resetValues });
                  onHandleReset();
                }}
                width={140}
              ></Button>
            )}
            {showCloseButton && (
              <Button
                title="Close"
                icon="window-close"
                width={140}
                onPress={onClose}
              />
            )}
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
