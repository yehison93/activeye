import { useState, useEffect } from "react";

const useForm = ({ parsed = [], initialSearch = "" }) => {
  const [channels, setChannels] = useState(parsed || []);

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  useEffect(() => {
    setChannels(
      (parsed || []).filter(
        (item) =>
          removeAccents(item.name)
            .toLowerCase()
            .includes(removeAccents(initialSearch).toLowerCase()) ||
          removeAccents(item.group.title)
            .toLowerCase()
            .includes(removeAccents(initialSearch).toLowerCase())
      )
    );
  }, [parsed, initialSearch]);

  const onChange = (search) => {
    setChannels(
      (parsed || []).filter(
        (item) =>
          removeAccents(item.name)
            .toLowerCase()
            .includes(removeAccents(search || initialSearch).toLowerCase()) ||
          removeAccents(item.group.title)
            .toLowerCase()
            .includes(removeAccents(search || initialSearch).toLowerCase())
      )
    );
  };

  return [channels, onChange];
};

export default useForm;
