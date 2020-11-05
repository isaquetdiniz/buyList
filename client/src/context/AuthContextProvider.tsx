import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext([] as any);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState();
  const [attInformations, setAtt] = useState<boolean>();

  const setAttInformations = () => {
    setAtt(!attInformations);
  };

  return (
    <AuthContext.Provider
      value={[token, setToken, attInformations, setAttInformations]}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
