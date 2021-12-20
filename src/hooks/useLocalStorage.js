import React, { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem("key");
      return item ? item : initialValue;
    } catch (error) {
      console.log("Error from useLocalStorage --> ", error);
      return initialValue;
    }
  });
  const setItem = (value) => {
    try {
      localStorage.setItem(key, value);
      setState(value);
    } catch (error) {}
  };
  return [state, setItem];
};

export default useLocalStorage;
