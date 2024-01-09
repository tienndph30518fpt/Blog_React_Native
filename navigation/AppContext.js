import { createContext } from "react";
import React, { useState } from 'react';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;

    // data su dung chung
    // const [inForUser, setinForUser] = useState({ isAdmin: false });
    const [inForUser, setinForUser] = useState({ isAdmin: false });

     const [isLogin, setisLogin] = useState(false)
    return (
        <AppContext.Provider value={{isLogin, setisLogin, inForUser, setinForUser}}>
            {children}
      </AppContext.Provider>  
    );
}
