import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppContext } from "./AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from "../LoginUser/Login";
import Regitter from "../LoginUser/Regitter";
import TrangChu from "../TabButton/TrangChu";
import CaNhan from "../TabButton/CaNhan";
import DangTin from "../TabButton/DangTin";
import CaNhanAdmin from "../TabButton/CaNhanAdmin";
import Follow from "../TabButton/Follow";
import TaiKhoan from "../TabButton/TaiKhoan";
import TrangChuAdmin from "../TabButton/TrangChuAdmin";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



// màn hình Đang Ký Đăng Nhập 
const StackUser = () => {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Regitter" component={Regitter} />
    </Stack.Navigator>
  );
};




// chứa các tab của User
const TabUser = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TrangChu"
        component={TrangChu}
        options={({ route }) => ({
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "home" : "home-outline"; // Sử dụng biểu tượng đầy đủ khi tab được chọn
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen name="Follow" component={Follow}
      
      options={({ route }) => ({
          tabBarLabel: "Follow",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "follow" : "follow-outline"; // Sử dụng biểu tượng "follow" cho tab "Follow"
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}

      />

      <Tab.Screen
        name="CaNhan"
        component={CaNhan}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: "Cá Nhân",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "person" : "person-outline"; // Sử dụng biểu tượng đầy đủ khi tab được chọn
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};


// chứa các tab của Admin
const TabAdmin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TrangChuAdmin"
        component={TrangChuAdmin}
        options={({ route }) => ({
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "home" : "home-outline"; // Sử dụng biểu tượng đầy đủ khi tab được chọn
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="DangTin"
        component={DangTin}
        options={({ route }) => ({
          tabBarLabel: "Đăng Tin",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "add-circle" : "add-circle-outline"; // Sử dụng biểu tượng đầy đủ khi tab được chọn
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="TaiKhoan"
        component={TaiKhoan}
        options={({ route }) => ({
          tabBarLabel: "Tài Khoản",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "key" : "key-outline"; // Thay đổi biểu tượng thành "key" cho tab "TaiKhoan"
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="CaNhanAdmin"
        component={CaNhanAdmin}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: "Cá Nhân",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "person" : "person-outline"; // Sử dụng biểu tượng đầy đủ khi tab được chọn
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {

  const { isLogin, inForUser } = useContext(AppContext);

  return (

    // <>
    //   {/* Sử dụng NavigationContainer ở đây nếu bạn muốn navigator chỉ hiển thị sau khi đăng nhập */}
    //   {isLogin === false ? <StackUser /> : <TabNavigator />}
    // </>

    <>
      {isLogin ? inForUser.isAdmin ? <TabAdmin /> : <TabUser /> : <StackUser />}
    </>
  );
};

export default AppNavigator;
