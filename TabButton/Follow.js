import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Follow = () => {
  const [favoriteAccounts, setFavoriteAccounts] = useState([]);
  
  useEffect(() => {
    // Thay vì sử dụng dữ liệu giả lập, bạn có thể tải danh sách tài khoản từ API của bạn ở đây.
    // Đảm bảo API trả về danh sách tài khoản với các thuộc tính như id, username và isFollowing.
    const url_api = 'https://651ea8da44a3a8aa4768c16b.mockapi.io/taikhoan';
    fetch(url_api)
      .then((response) => response.json())
      .then((data) => {
        // Thiết lập trạng thái mặc định là "đang follow" cho tất cả các tài khoản
        const accountsWithDefaultFollow = data.map((account) => ({ ...account, isFollowing: true }));
        setFavoriteAccounts(accountsWithDefaultFollow);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu từ API', error);
      });
  }, []);

  const toggleFollow = (id) => {
    // Gửi yêu cầu đến máy chủ để thay đổi trạng thái theo dõi
    // Sau đó, cập nhật trạng thái theo dõi của tài khoản tại đây
    setFavoriteAccounts((prevAccounts) => {
      return prevAccounts.map((account) =>
        account.id === id ? { ...account, isFollowing: !account.isFollowing } : account
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh Sách Yêu Thích</Text>
      <FlatList
        data={favoriteAccounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <Text style={styles.username}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => toggleFollow(item.id)}
              style={[
                styles.followButton,
                { backgroundColor: item.isFollowing ? 'green' : 'red' },
              ]}
            >
              <Text style={styles.followButtonText}>
                {item.isFollowing ? 'Bỏ theo dõi' : 'Theo dõi'}
              </Text>
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
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: 300,
  },
  username: {
    fontSize: 16,
  },
  followButton: {
    padding: 8,
    borderRadius: 5,
  },
  followButtonText: {
    color: 'white',
  },
});

export default Follow;
