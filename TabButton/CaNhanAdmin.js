import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppContext } from "../navigation/AppContext";

const CaNhanAdmin = () => {

  const { setisLogin, setinForUser } = useContext(AppContext); 
  const dangXuat = () => {
    setisLogin(false);
  };

  return (
    <SafeAreaView style={styles.contener}>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Đây là Tài Khoản ADMIN
        </Text>
        
        <Image style={styles.avater} source={require("../images/admin.png")} />
        <View style={styles.text}>
          <Text>Chủ Tài Khoản: Nguyễn Duy Tiến</Text>
          <Text>Tài Khoản: admin@gmail.com</Text>
        <Text>PH: 30518 Cao Đẳng FPT</Text>
        </View>

        <Button style={styles.buttonDX} title="Đăng Xuất" onPress={dangXuat} />
     
      </View>
    </SafeAreaView>
  );
};
export default CaNhanAdmin;

const styles = StyleSheet.create({
  contener: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  avater: {
    marginTop: 30,
    marginLeft: 40,
    backgroundColor: "#CCFFCC",
    width: 250,
    height: 250,
    borderRadius: 40,
  },
  text: {
    marginTop: 30,
    alignItems: "center",
  },
  buttonDX: {
    alignSelf: 'flex-start', // Đặt nút ở bên trái
        marginTop: 20 // Điều chỉnh khoảng cách từ top
  },
});
