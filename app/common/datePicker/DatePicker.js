import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import PickerMonth from "./PickerMonth";
import { getDate, getDDMMYYYY, getToday } from "../../utility/dateFunctions";
import colors from "../../config/colors";
import DropShadow from "../DropShadow";

export default DatePicker = ({
  title,
  name,
  selectedDay,
  onDaySelected,
  showIcon = false,
}) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const [currentMonth, setCurrentMonth] = useState(
    values[name] === null ? getToday().dateFrom : values[name]
  );
  const [pickedDate, setPickedDate] = useState(values[null]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    //console.info("useEffect....", selectedDay);
    //setCurrentMonth(selectedDay);
    //console.info("useEffect in DatePicker...", pickedDate, selectedDay);
    setPickedDate(values[name]);
  }, [values[name]]);

  const calcCurrentMonth = (date, increment) => {
    const month = getDate(date).getMonth() + increment;
    const newdate = new Date(getDate(date).getFullYear(), month, 1);
    setCurrentMonth(getDDMMYYYY(newdate));
  };

  const handleMonthChange = (increment) => {
    console.info("handleMonthChange");
    calcCurrentMonth(currentMonth, increment);
  };

  const handleShowPicker = () => {
    calcCurrentMonth(
      values[name] === null ? getToday().dateFrom : values[name],
      0
    );
    setShowPicker(!showPicker);
  };

  const handleDaySelected = (dayCell) => {
    setShowPicker(false);
    calcCurrentMonth(dayCell.date, 0);
    setPickedDate(dayCell.date);
    onDaySelected(dayCell);
    setFieldValue(name, dayCell.date);
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleShowPicker}>
          {showIcon ? (
            <FontAwesome5 name="calendar-alt" size={34} color={colors.blue} />
          ) : (
            <>
              <Text>{title}</Text>
              <Text style={styles.text}>{pickedDate}</Text>
            </>
          )}
        </TouchableOpacity>
        {showPicker && (
          <DropShadow>
            <View style={styles.container}>
              <PickerMonth
                selectedDay={pickedDate}
                currentMonth={currentMonth}
                onMonthChange={handleMonthChange}
                onDaySelected={handleDaySelected}
              />
            </View>
          </DropShadow>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: -320,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
    //backgroundColor: "red",
  },
  dateContainer: {
    margin: 10,
  },
  text: {
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    padding: 7,
    width: 120,
    textAlign: "center",
    backgroundColor: colors.white,
  },
});
