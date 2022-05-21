import React, { useState } from "react";
import { useFormikContext } from "formik";

import FlatListPicker from "../picker/FlatListPicker";
import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";

function FormDropDownList({
  items,
  name,
  icon,
  numberOfColumns,
  placeholder,
  width,
  height,
  listWidth,
  listHeight,
  left,
  textProperty,
  valueProperty,
  defaultItem = null,
  submitOnSelect = false,
  //  onAddEntry,
}) {
  const { errors, setFieldValue, touched, values, handleSubmit, handleReset } =
    useFormikContext();
  const [selectedItem, setSelectedItem] = useState(
    items.filter((item) => item[valueProperty] === values[name])[0]
  );
  return (
    <>
      <FlatListPicker
        items={items}
        icon={icon}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => {
          setSelectedItem(item);
          setFieldValue(name, item[valueProperty]);
          if (submitOnSelect) handleSubmit();
        }}
        placeholder={placeholder}
        selectedItem={selectedItem}
        width={width}
        height={height}
        listHeight={listHeight}
        listWidth={listWidth}
        left={left}
        textProperty={textProperty}
        valueProperty={valueProperty}
        // onAddEntry={onAddEntry}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormDropDownList;
