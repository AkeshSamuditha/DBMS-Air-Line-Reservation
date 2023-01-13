import { useState, useEffect } from "react";

export const useRoute = () => {
  const [Route_ID, setRoute_ID] = useState(
    localStorage.getItem("Route_ID") || ""
  );

  useEffect(() => {
    localStorage.setItem("Route_ID", Route_ID);
  }, [Route_ID]);

  return [Route_ID, setRoute_ID];
};
