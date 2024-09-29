import React from 'react'
import { createContext, useContext, useState, useEffect } from "react"

export const ContextApi = createContext(null);
// export const useContextApi =()=> useContext(ContextApi);

export const Context = (props) => {

const [user, setUser] = useState(null);
const [userId,setUserId] = useState(0);


  return <ContextApi.Provider value={{ user, userId, setUser, setUserId }}>
  {props.children}
</ContextApi.Provider>
};
