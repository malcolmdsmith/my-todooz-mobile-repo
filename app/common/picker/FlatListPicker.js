import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import defaultStyles from "../../config/styles";
import DropShadow from "../DropShadow";
import PickerItem from "./PickerItem";
import colors from "../../config/colors";

export default FlatListPicker = ({
  title,
  icon,
  items,
  placeholder,
  selectedItem,
  onSelectItem,
  textProperty,
  valueProperty,
  width = 100,
  height = 40,
  listWidth = 100,
  listHeight = 100,
  left = -250,
  bgColor = defaultStyles.colors.dropdownlist,
  selectedBGColor = defaultStyles.colors.dropdownlistSelected,
}) => {
  const [showList, setShowList] = useState(false);

  const handleSelectedItem = (item) => {
    setShowList(false);
    selectedItem = item;
    onSelectItem(item);
  };

  return (
    <View style={styles.container} width={width}>
      <TouchableOpacity onPress={() => setShowList(!showList)}>
        <View
          style={[
            styles.box,
            { backgroundColor: bgColor },
            { paddingRight: icon ? 40 : 15 },
          ]}
          height={height}
        >
          {icon && (
            <FontAwesome5
              name={icon}
              size={20}
              color={defaultStyles.colors.dark}
              style={styles.icon}
            />
          )}
          <View
            style={[styles.text, { backgroundColor: bgColor }]}
            width={width}
          >
            {selectedItem === null ? (
              <Text style={[defaultStyles.text]}>{placeholder}</Text>
            ) : (
              <Text style={[defaultStyles.text]}>
                {selectedItem[textProperty]}
              </Text>
            )}
          </View>
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
            style={[
              styles.listContainer,
              { height: listHeight, width: listWidth, left: left },
              { backgroundColor: bgColor },
              { top: icon ? 56 : 40 },
            ]}
          >
            <FlatList
              //style={styles.list}
              data={items}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              horizontal={false}
              renderItem={({ item }) => (
                <PickerItem
                  item={item}
                  textProperty={textProperty}
                  onPress={() => {
                    //setModalVisible(false);
                    handleSelectedItem(item);
                  }}
                  selectedItem={selectedItem}
                  bgColor={bgColor}
                  selectedBGColor={selectedBGColor}
                />
              )}
            />
          </View>
        </DropShadow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: "center",
    borderRadius: 20,
  },
  container: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  listContainer: {
    position: "absolute",
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
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    padding: 7,
  },
});
