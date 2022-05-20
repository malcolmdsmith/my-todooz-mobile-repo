import React, { Component, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import DropShadow from "../DropShadow";

export default Picker = ({
  title,
  items,
  width = 100,
  listWidth = 100,
  height = 100,
  selectedItem,
  onSelectItem,
  textProperty,
  valueProperty,
}) => {
  const [showList, setShowList] = useState(false);

  const handleSelectedItem = (item) => {
    setShowList(false);
    onSelectItem(item);
    //selectedItem = item;
  };

  //console.info("selectedItem...", selectedItem);
  return (
    <View style={styles.container} width={width}>
      {/* <Text>{title}</Text> */}
      <TouchableOpacity onPress={() => setShowList(!showList)}>
        <View style={styles.text} width={width}>
          <Text style={[defaultStyles.text]}>{selectedItem[textProperty]}</Text>
          {showList ? (
            <MaterialCommunityIcons name="chevron-up" size={20} />
          ) : (
            <MaterialCommunityIcons name="chevron-down" size={20} />
          )}
        </View>
      </TouchableOpacity>
      {showList && (
        <DropShadow>
          <View
            style={[styles.listContainer, { height: height, width: listWidth }]}
          >
            {items.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleSelectedItem(item)}
              >
                <Text style={styles.listItem}>{item[textProperty]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </DropShadow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
  },
  container: {},
  listContainer: {
    position: "absolute",
    top: 2,
    marginLeft: 10,
    paddingLeft: 15,
    backgroundColor: defaultStyles.colors.list,
    zIndex: 1000,
    elevation: 1000,
  },
  listItem: {
    textAlign: "left",
    paddingTop: 10,
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: defaultStyles.colors.list,
    height: 34,
    borderRadius: 5,
    borderColor: defaultStyles.colors.border,
    borderWidth: 1,
    textAlign: "center",
    padding: 7,
  },
});
