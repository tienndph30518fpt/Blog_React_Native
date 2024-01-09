import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../navigation/AppContext";
const CaNhan = () => {
  const [userData, setUserData] = useState(null);
  const { inForUser } = useContext(AppContext);
  //
  const { setisLogin, setinForUser } = useContext(AppContext); 
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const url_api = `https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan/${inForUser}`;
  console.log("API_ID", url_api);






 

 
  const navigation = useNavigation(); // Đảm bảo rằng bạn đã import `useNavigation` từ `@react-navigation/native`

  const dangXuat = () => {
    // Chuyển đến màn hình "Login" trong Stack "StackUser"
    setisLogin(false);
  };


  const fetchData = async () => {
    try {
      const response = await fetch(url_api);
      if (response.ok) {
        const data = await response.json();
        console.log("Dữ Liệu Cá Nhân : ", data);
        setUserData(data);
      } else {
        console.log("Lỗi Khi Lấy Dữ Liệu Từ API", response.status);
      }
    } catch (error) {
      console.log("Lỗi ERR", error);
    }
  };

  const updateApi = () => {
    const trimmedEmail = email.trim();
    const trimmedPass = pass.trim();
    let obj = {
      name: trimmedEmail,
      assdress: trimmedPass,
    };
    fetch(url_api, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Thông Báo! ", "Sửa Thành Công");
          fetchData();
        } else {
          Alert.alert("Thông Báo!", "Sửa Thất Bại");
        }
      })
      .catch((error) => {
        console.log("ERR", error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Tin Tài Khoản</Text>
      {userData && (
        <View>
          <Image source={{ uri: userData.avata }} style={styles.avatar} />

          <Text>Tài Khoản Của Bạn Là : {userData.name}</Text>
          <Text>Mật Khẩu Là : {userData.assdress}</Text>

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            ĐỔi Thông Tin Người dùng{" "}
          </Text>
          <Text>Tài Khoản</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setemail(text)}
          />

          <Text>Mật Khẩu</Text>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setpass(text)}
          />
        </View>
      )}
      <View style={styles.buttons}>
        <Button title="Đăng Xuất" onPress={dangXuat} />
        <View style={ {width: 36}} />
        <Button title="Cập Nhật" onPress={updateApi} />
      </View>
    </View>
  );
};

export default CaNhan;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  avatar: {
    width: 250,
    height: 200,
    borderRadius: 50, // Để hình ảnh trở thành hình tròn
    marginVertical: 10,
  },
  inputText: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
  }, buttons: {
    flexDirection: "row",
    margin:30
  }
});
