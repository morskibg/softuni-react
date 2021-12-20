import { createContext, useContext } from "react";

const adminContext = createContext();

export default adminContext;

export const useAdminContext = () => {
  const adminState = useContext(adminContext);
  return adminState;
};
