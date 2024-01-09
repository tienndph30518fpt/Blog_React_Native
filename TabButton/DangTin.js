import { Alert, StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const DangTin = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [comment, setcomment] = useState("");

  const url_api = "https://651ea8da44a3a8aa4768c16b.mockapi.io/thongtin";

  const postAPI = () => {
    if (!title.trim() || !content.trim() || !image.trim()) {
      Alert.alert("Thông Báo!", "Bạn Lên Nhập Đầy Đủ Các Trường ");
    } else {
      let obj = {
        title: title,
        content: content,
        image: image,
      };
      fetch(url_api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((data) => {
          console.log(data); // Log the data returned by the API
          if (data.status == 201) {
            Alert.alert("Thêm Dữ Liẹu Thành Công");
            setcomment("");
            settitle("");
            setimage("");
          } else {
            Alert.alert("Thêm Dữ Liệu Thất Bại");
          }
        })
        .catch((error) => {
          console.log("Lỗi ERR", error);
        });
    }
  
  };

  // truy cập thư viện ảnh
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // if (!result.canceled) {
    //   setimage(result.assets[0].uri);
    // }
    if (result && !result.canceled) {
      setimage(result.assets[0].uri);
    }
    
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 26, fontWeight: "bold" }}>
        DangTin
      </Text>

      <TextInput
        style={styles.textiput}
        placeholder="Nhập Vào Title"
        onChangeText={(text) => settitle(text)}
      />
      <TextInput
        style={styles.textiput}
        placeholder="Nhập Vào content"
        onChangeText={(text) => setcontent(text)}
      />
      <Button title="Chose image" onPress={pickImage} />

      <View  style={styles.imagehienThi}>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

      </View>


      <Button title="Thêm Mơi" onPress={() => postAPI()} />
    </View>
  );
};

export default DangTin;

const styles = StyleSheet.create({
  textiput: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  }, imagehienThi: {
    alignItems: "center",
    justifyContent:"center"
  }
});
