import React, { useMemo, useState } from "react";
const useTheme = (defaultValue) => {
  const [value, setValue] = useState(defaultValue[0]);

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
