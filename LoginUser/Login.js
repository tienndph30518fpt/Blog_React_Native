import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ToastAndroid } from "react-native";
import { AppContext } from "../navigation/AppContext";

const ADMIN_EMAIL = "admin"; // Địa chỉ email của Admin

const Login = () => {
  const navigation = useNavigation();
  const [isCheck, setisCheck] = React.useState(false);
  const [emaiUser, setemaiUser] = useState("");
  const [passUser, setpassUser] = useState("");
  const { setisLogin, setinForUser } = useContext(AppContext); // Sử dụng useContext để truy cập AppContext
  const { inForUser } = useContext(AppContext);
  var url_api = "https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan";

  // chuyển qua màn hình đăng ký
  const dangKy = () => {
    navigation.navigate("Regitter");
  };


  

  const dangNhapNe = async () => {
    try {
      if (!emaiUser.trim() || !passUser.trim()) {
        Alert.alert("Thông Báo!", "Bạn Nhập Tài Khoản Hoặc Mật Khẩu");
      } else {
        const response = await fetch(url_api);

        if (response.ok) {
          const data = await response.json();
          const matchingUser = data.find(
            (user) => user.name === emaiUser && user.assdress === passUser
          );

          if (matchingUser) {
            if (matchingUser.name === ADMIN_EMAIL) {
             
              // setinForUser({ ...inForUser, isAdmin: true }); // Sử dụng setinForUser thay vì inForUser
              setinForUser(matchingUser.id);
              setinForUser({ inForUser, isAdmin: true });
              setisLogin(true);
              console.log("Đang Đăng Nhập Từ TK Admin",{ ...inForUser, isAdmin: true });
              ToastAndroid.show("Admin Đăng Nhập Thành Công", ToastAndroid.SHORT);
            } else {
              ToastAndroid.show("Đăng Nhập Thành Công", ToastAndroid.SHORT);
              setinForUser(matchingUser.id);
              console.log("User: ", matchingUser.id);
              setisLogin(true);
            }
          } else {
            ToastAndroid.show("Thông Tin Đăng Nhập Không Chính Xác", ToastAndroid.SHORT);
          }
        } else {
          console.error("Lỗi khi gửi yêu cầu đăng nhập:", response.status);
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <View style={styles.conten}>
      <Text style={styles.contenner}>Đăng Nhập App Mới</Text>

      <Image
            style={styles.icon}
            source={require("../images/logo_icon.png")}
          />
        
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào tài Khoản"
          onChangeText={setemaiUser}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào mật khẩu"
          onChangeText={setpassUser}
        />
      </View>

      <View style={styles.isChecked}>
        <View style={styles.isChecked}>
          <BouncyCheckbox
            isCheck={isCheck}
            onPress={() => {
              setisCheck(!isCheck); // Đảo ngược giá trị isCheck khi nhấn vào checkbox
            }}
          />
          <Text>{isCheck ? "Checked" : "Lưu Mật Khẩu"}</Text>
        </View>
        <Text style={{ marginLeft: 50, color: "blue" }}>
          Forgot the passWord?
        </Text>
      </View>

      <View style={[styles.buttonContainer, { marginLeft: 20 }]}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.7}
          onPress={dangNhapNe}
        >
          <Text>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.7}
          onPress={dangKy}
        >
          <Text>Register</Text>
        </TouchableHighlight>
      </View>

      <Text style={{ justifyContent: "center", marginTop: 20 }}>
        or continue with
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonScoial}>
          <Image
            style={styles.imageScoial}
            source={require("../images/facebook.png")}
          />
          <Text>FaceBook</Text>
        </Pressable>

        <Pressable style={styles.buttonScoial}>
          <Image
            style={styles.imageScoial}
            source={require("../images/goodle.png")}
          />
          <Text>Goole</Text>
        </Pressable>
      </View>
      {/* <ListNew/> */}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  conten: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  contenner: {
    marginTop:30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    alignItems: "center",
    width: 300,
    height: 40,
    paddingHorizontal: 8,
    margin: 15,
  },
  butonLogin: {
    backgroundColor: "pink", // Thay đổi màu của nút thành "pink"
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5, // (Tuỳ chọn) Đặt bo góc cho nút
    marginTop: 20, // (Tuỳ chọn) Đặt khoảng cách từ nút đến các TextInput
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  button: {
    backgroundColor: "pink",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1, // Để hai nút có kích thước bằng nhau
    marginRight: 20, // (Tuỳ chọn) Đặt khoảng cách giữa hai nút
  },
  isChecked: {
    flexDirection: "row", // Đặt hướng là ngang (ngang hàng)
    // alignItems: "center",
    // marginRight: 160,
  },
  imageScoial: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  buttonScoial: {
    flexDirection: "row",
    width: 134,
    height: 48,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginEnd: 10,
  }, icon: {
    marginTop:30,
    width: 400,
    height: 180,
    alignItems:"center"
  }
});
