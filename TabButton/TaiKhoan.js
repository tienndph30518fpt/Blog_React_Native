import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet , TouchableOpacity, Alert} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TaiKhoan = () => {
  const [userList, setUserList] = useState([]);
    const [select, setselect] = useState(null);
  // Simulated API data (replace with your actual API call)
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        "https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan"
      );
      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      } else {
        console.error("Error fetching data from API");
      }
    } catch (error) {
      console.error("API request failed", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

    
    
    const xoaTK = (userId) => {
      
        let API_url =`https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan/${userId}`;
        fetch(API_url, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        }).then((res) => {
            if (res.status == 200) {
                Alert.alert("Xoá!", "Xoá Thành Công");
                fetchDataFromAPI();
            } else {
                Alert.alert("Xoá!", "Xoá Thất Bại");
            }
        }).catch((error) => {
            console.log("ERR", error);
        })
    }
    
    
    const ShowAlert = (item) => {
        Alert.alert("Thông Báo!",
            "Bạn Có Muốn Xoá Không",
            [
                {
                    text: "Xoá",
                    onPress: () => {
                        console.log(" Đã bấm nút đồng ý");
                        xoaTK(item);
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Không đồng ý");
                    },
                    style: "cancel"
                }
            ],
            {
                cancelable: true,
                onDismiss: () => {
                    // hàm này được gọi khi bấm ra ngoài Dialog
                    console.log("Đã tắt Dialog bằng cách bấm ra ngoài");
                }
            }
        );
    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh Sách Tài Khoản Người Dùng</Text>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id.toString()} // Replace with a unique identifier from your data
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>Tài Khoản: {item.name}</Text>
            <Text style={styles.userEmail}>Mật Khẩu: {item.assdress}</Text>

            <TouchableOpacity
              onPress={() => ShowAlert(item.id)}
              style={styles.deleteIcon}
            >
              <Icon name="facebook" size={20} color="#FF0000" />
                <Text>Xoá</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userItem: {
    padding: 16,

    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#9C9C9C",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#333",
  },deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Để đảm bảo nút xoá nằm trên cùng
  },
});

export default TaiKhoan;
