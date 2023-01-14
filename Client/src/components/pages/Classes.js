import { useState, useEffect } from "react";

export const useClasses = () => {
  const [classes, setClasses1] = useState(
    localStorage.getItem("Classes") || ""
  );

  useEffect(() => {
    localStorage.setItem("Classes", classes);
  }, [classes]);

  return [classes, setClasses1];
};
