import { useState, useEffect } from "react";

export const useFlight = () => {
  const [Flight_ID, setFlight_ID] = useState(
    localStorage.getItem("Flight_ID") || ""
  );

  useEffect(() => {
    localStorage.setItem("Flight_ID", Flight_ID);
  }, [Flight_ID]);

  return [Flight_ID, setFlight_ID];
};
