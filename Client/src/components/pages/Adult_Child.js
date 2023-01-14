import { useState, useEffect } from "react";

export const useType = () => {
  const [type, setType] = useState(localStorage.getItem("Type") || "");

  useEffect(() => {
    localStorage.setItem("Type", type);
  }, [type]);

  return [type, setType];
};
