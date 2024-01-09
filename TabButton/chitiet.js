import { StyleSheet, Text, View } from "react-native";
import React from "react";

const chitiet = ({ route }) => {
  const { item } = route.params; // Access the item data passed from "TrangChu"

  return (
    <View>
      <Text>chitiet</Text>
      {/* Render the details from the item */}
      <Text>Tiêu Đề: {item.title}</Text>
      <Text>Nội Dung: {item.content}</Text>
    </View>
  );
};

export default chitiet;

const styles = StyleSheet.create({});
