import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ImageBackground,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { isTablet } from "react-native-device-detection";

import Text from "./Text";
import PickerItem from "./PickerItem";
import Button from "./Button";
import defaultStyles from "../config/styles";

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  onClearItem,
  onAddEntry,
  width = "100%",
  showPlaceholderAbove = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const getPlaceholder = () => {
    if (!showPlaceholderAbove)
      return <Text style={styles.placeholder}>{placeholder}</Text>;
    return null;
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.outerContainer, { width }]}>
          {showPlaceholderAbove && <Text>{placeholder}</Text>}
          <View style={[styles.container, { width }]}>
            {icon && (
              <FontAwesome5
                name={icon}
                size={20}
                color={defaultStyles.colors.dark}
                style={styles.icon}
              />
            )}
            {selectedItem ? (
              <Text style={styles.text}>{selectedItem}</Text>
            ) : (
              getPlaceholder()
            )}
            <MaterialCommunityIcons
              name="chevron-right"
              color={defaultStyles.colors.border}
              size={20}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <MaterialCommunityIcons
        name="close-octagon-outline"
        size={22}
        color={defaultStyles.colors.medium}
        onPress={onClearItem}
      /> */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {onAddEntry && (
            <Button
              title="Add"
              color={defaultStyles.colors.primary}
              icon="plus"
              onPress={() => {
                setModalVisible(false);
                onAddEntry();
              }}
            />
          )}
          <Button
            title="Close"
            bgColor={defaultStyles.colors.primary}
            onPress={() => setModalVisible(false)}
            icon="window-close"
          />
          <FlatList
            style={styles.list}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numberOfColumns}
            horizontal={false}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.formField,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 12,
    marginVertical: 0,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  outerContainer: {
    flexDirection: "column",
  },
  placeholder: {
    backgroundColor: defaultStyles.colors.formField,
    flex: 1,
  },
  list: {},
  modalContainer: {
    width: isTablet ? "80%" : "100%",
    // justifyContent: "center",
    padding: 20,
  },
  text: {
    flex: 1,
    textAlign: "center",
    backgroundColor: defaultStyles.colors.formField,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default AppPicker;
