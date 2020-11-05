import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext([] as any);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState();

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
