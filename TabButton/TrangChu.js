import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  Button
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Ví dụ sử dụng FontAwesome
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { ShareDialog } from "react-native-fbsdk";

import { Share } from 'react-native';


const TrangChu = () => {
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [dataChanged, setDataChanged] = useState(false); // Thêm state mới
  const [refreshing, setrefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setcomment] = useState("");
  const [sarch, setstarch] = useState("");

  // const navigation = useNavigation();




  // chia se lên fb
 
  const onShare = async () => {
    
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
        // url: url,
        
      });

      
      if (result.action == Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const url_api = "https://651ea8da44a3a8aa4768c16b.mockapi.io/thongtin";



  // hiển thị dialog xoá item khi
  const openDeleteDialog = (item) => {
    console.log("ID của item", item.id);
    setItemToDelete(item.id);

    // Hiển thị hộp thoại xoá
    Alert.alert(
      "Xoá",
      `Bạn có chắc chắn muốn xoá ${item.name}?`,
      [
        {
          text: "Huỷ",
          onPress: () => {
            // Đặt itemToDelete thành null khi hủy
            setItemToDelete(null);
          },
          style: "cancel",
        },
        {
          text: "Xoá",
          onPress: () => {
            const api_delete = `${url_api}/${item.id}`;
            fetch(api_delete, {
              method: "DELETE",
            })
              .then((res) => {
                if (res.ok) {
                  alert("Xoá Thành Công");
                  setDataChanged(true);
                } else {
                  alert("Xoá Thất Bại");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("Xoá Bị lỗi err!");
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // load lại dữ liệu khi khéo listview
  const handlRefresh = () => {
    setrefreshing(true);
    fetchDataFromApi().then(() => {
      setrefreshing(false);
    });
  };


  // load lại dữ liệu mới
  React.useEffect(() => {
    fetchDataFromApi();
  }, [dataChanged]);


/// lấy dữ liệu trả về từ API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(url_api);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        setDataChanged(false); // Đăt dataChanged về false sau khi cập nhật data
      } else {
        console.error("Lỗi khi lấy dữ liệu từ API:", response.status);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };


  // let timeUot = null;
  // const cuontDownSeach = (sarch) => {
  //   if (timeUot) {
  //     clearTimeout(timeUot);
  //   } timeUot = setTimeout(() => {
  //     performSearch();
  //   }, 2000);
  // }


  // tìm kiếm thông tin theo tên

  const performSearch = async () => {
    const searchURL = `https://651ea8da44a3a8aa4768c16b.mockapi.io/thongtin?search=${sarch}`;
  
    try {
      const response = await fetch(searchURL);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        setDataChanged(false); // Đặt dataChanged về false sau khi cập nhật data
      } else {
        console.error("Lỗi khi lấy dữ liệu từ API:", response.status);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  

/// thêm bình luận nhưng không hợp lý
  const setComment = () => {
    let obj = {
      comment: comment
    }
    fetch(url_api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, body: JSON.stringify(obj)
    }).then((res) => {
      if (res.status == 201) {
        Alert.alert("Thêm!", "Thêm Bình Luận Thành Công");
      } else {
        Alert.alert("Thêm!", "Thêm Bình Luận Thất Bại");
      }
    }).catch((err) => {
      console.log("Lối Bình Luận", err);
    })
}

  
  // chuyển màn 
  const navigateToChiTiet = (item) => {
    // Navigate to the "chitiet" screen and pass the item data as a parameter
    navigation.navigate("chitiet", { item });
  };
  
  
// chứa các item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
       
        <TouchableOpacity onPress={() => openDeleteDialog(item)}>
          <Image style={styles.avatar} source={{ uri: item.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Tiêu Đề: {item.title}</Text>
            <Text style={styles.address}>Nội Dung: {item.content}</Text>
            <Text style={styles.comment}>Bình Luận: {item.comment}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="thumbs-up" size={20} color="blue" />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.actionButton} onPress={() => navigateToChiTiet(item)}>
               <Icon name="comment" size={20} color="gray" />
              <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.actionButton} onPress={toggleModal}>
            <Icon name="comment" size={20} color="gray" />
            <Text style={styles.actionText}>Comment</Text>

          
    
          
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Thêm bình luận</Text>
                <TextInput
                  placeholder="Nhập bình luận..."
                  style={styles.inputField}
                  onChangeText={(text)=>setcomment(text)}
                />
                <Button
                  title="Thêm"
                  onPress={() => {
                    setComment()
                    // Xử lý thêm bình luận vào danh sách bình luận của item
                    // Sau đó đóng dialog modal
                    toggleModal();
                  }}
                 
                />
                <Button title="Huỷ" onPress={() => {
                  toggleModal();
                 }}/>
              </View>
            </Modal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Icon name="share" size={20} color="gray" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style= {styles.noidung}>
      
      <View>
        <TouchableOpacity onPress={performSearch}>
          <View style={styles.searchContainer}>
            <TextInput
               style={styles.searchInput}
              placeholder="Nhập Nội Dung Tìm Kiếm" onChangeText={(text) => setstarch(text)} />
            <Image  style={styles.searchIcon} source={ require("../images/search.png")} />
          </View>
         
          </TouchableOpacity>
          </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handlRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    justifyContent: "center",
    width: 350,
    height: 300,
    borderRadius: 5,
    marginRight: 16,
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  comment: {
    fontSize: 14,
    color: "#555",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionText: {
    marginLeft: 8,
  },

  deleteButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  }, search_text: {
    width: 20,
    height:20
  },  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   justifyContent:"flex-end",
    margin:10,
  },  searchInput: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  searchIcon: {
    width: 40,
    height: 40,
  }, noidung: {
    flex:1
  }
});

export default TrangChu;
