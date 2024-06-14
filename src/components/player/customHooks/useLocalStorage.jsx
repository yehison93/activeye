import { useState, useEffect } from "react";

const useLocalStorage = (defaultData, nameLocalStorage) => {
  const loadData = JSON.parse(localStorage.getItem(nameLocalStorage));

  const [data, setData] = useState(loadData || defaultData);

  useEffect(() => {
    localStorage.setItem(nameLocalStorage, JSON.stringify(data));
  }, [data, nameLocalStorage]);

  return [data, setData];
};

export default useLocalStorage;
