import { useState } from "react";

const useForm = (parsed) => {
  const [channels, setChannels] = useState(parsed);

  const onChange = (search) => {
    setChannels(
      parsed.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  return [channels, onChange];
};

export default useForm;
