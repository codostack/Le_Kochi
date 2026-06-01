import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);
  const [customer, setCustomer] = useState(null);
console.log("customerId",customerId);

  return (
    <AuthContext.Provider
      value={{
        customerId,
        setCustomerId,
        customer,
        setCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};