import { useState, useEffect } from "react";

export const useSeat_ID = () => {
  const [seat_ID, setSeat_ID] = useState(localStorage.getItem("Seat_ID") || "");

  useEffect(() => {
    localStorage.setItem("Seat_ID", seat_ID);
  }, [seat_ID]);

  return [seat_ID, setSeat_ID];
};
