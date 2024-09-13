import { createContext, useContext } from "react";

export const LeafletContext = createContext(null);

const useMap = () => {
  const value = useContext(LeafletContext);

  return value;
};

export default useMap;
