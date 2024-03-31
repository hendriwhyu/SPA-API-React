import React, { useState } from "react";

function useTheme(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
}

export default useTheme;
