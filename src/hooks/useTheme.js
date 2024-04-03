import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

const useTheme = (defaultValue, initial) => {
  const [value, setValue] = useState(initial);

  const handleChange = () => {
    setValue((prevValue) =>
      prevValue === defaultValue[0] ? defaultValue[1] : defaultValue[0]
    );
  };

  const valueMemo = useMemo(
    () => ({
      value,
      handleChange,
    }),
    [value]
  );

  return valueMemo;
};

export default useTheme;
