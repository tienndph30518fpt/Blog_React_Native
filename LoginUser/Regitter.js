import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useState , useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ToastAndroid } from "react-native";
import { AppContext } from "../navigation/AppContext";
import { Alert } from 'react-native';

const Regitter = () => {
  const navigation = useNavigation();
  const [isCheck, setisCheck] = React.useState(false);
  const [ten, setTen] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [data, setData] = useState([]);
  var url_api = "https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan";

  // xoá trắng ký tự
  const Cancel = () => {
    setTen("");
    setDiaChi("");
  };




  ////////
  useEffect(() => {
    // Tải danh sách từ API khi ứng dụng khởi chạy
    fetchDataFromApi();
   
  }, []);


  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const isNameExists = (nameToCheck) => {
    return data.some((item) => item.name === nameToCheck);
  };

/////  
  const setDangKyAPI = async () => {
    try {

      

      if (isNameExists(ten)) {
        Alert.alert("Error!", "Tên này đã tồn tại!");
      } else {
        let obj_api = {
          name: ten,
          assdress: diaChi,
        };

        const response = await fetch(url_api, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj_api),
        });
        

        if (response.ok) {
          Alert.alert("Thêm!", "Thêm Dữ Liệu Thành Công");
          fetchDataFromApi(); // Tải lại danh sách sau khi thêm dữ liệu thành công
          navigation.navigate("Login");
        } else {
          Alert.alert("Lỗi!", "Thêm Dữ Liệu Thất Bại");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi!");
    }
  };
  ;

  return (
    <View style={styles.conten}>
      <Text style={styles.contenner}>Welcome</Text>

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào tài Khoản"
          onChangeText={setTen}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào mật khẩu"
          onChangeText={setDiaChi}
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
          onPress={setDangKyAPI}
        >
          <Text>Register</Text>
        </TouchableHighlight>


        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.7}
          onPress={Cancel}
        >
          <Text>Cancel</Text>
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

export default Regitter;

const styles = StyleSheet.create({
  conten: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  contenner: {
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
  },
});
