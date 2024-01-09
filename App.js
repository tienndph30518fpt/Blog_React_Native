import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { AppContextProvider } from "./navigation/AppContext";

export default function App() {
  const [isLogin, setisLogin] = useState(false);
  return (
    <AppContextProvider>
      {/* Đặt NavigationContainer ở cấp cao nhất của màn hình bạn muốn quản lý bằng navigator */}
      <NavigationContainer>
        {/* Bạn có thể thay thế AppNavigator ở đây bằng các màn hình khác */}
      <AppNavigator/>
      </NavigationContainer>
    </AppContextProvider>
  );
}
