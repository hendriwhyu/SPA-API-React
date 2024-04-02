import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
const useTheme = (defaultValue) => {
  const [value, setValue] = useState(defaultValue[0]);

  const handleChange = () => {
    setValue((prevValue) =>
      prevValue === defaultValue[0] ? defaultValue[1] : defaultValue[0]
    );
    const toastTitle =
      value === defaultValue[0] ? defaultValue[1] : defaultValue[0];
    const toastStyle =
      value === "light" ? { background: "#333", color: "#fff" } : {};

    toast.success(`Change to ${toastTitle || value}`, {
      duration: 3000,
      position: "top-center",
      icon: "👏",
      style: toastStyle,
    });
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
