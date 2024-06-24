import { createContext, PropsWithChildren, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  jwt: string | null;
  authenticated: boolean;
  profileImageUrl: string | null;
  fullName: string | null;
};

type AuthContextType = {
  authState: AuthState;
  onLoginSuccess: (
    jwt: string,
    profileImageUrl: string,
    fullName: string
  ) => void;
  logout: () => void;
};

const initialState: AuthContextType = {
  authState: {
    jwt: null,
    authenticated: false,
    profileImageUrl: null,
    fullName: null,
  },
  onLoginSuccess: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, setAuthState] = useState<AuthState>(initialState.authState);

  useEffect(() => {
    const initializeAuthState = async () => {
      const jwt = await SecureStore.getItemAsync("jwt");
      const profileImageUrl = await SecureStore.getItemAsync("profileImageUrl");
      const fullName = await SecureStore.getItemAsync("userFullName");
      if (jwt) {
        setAuthState({
          jwt,
          authenticated: true,
          profileImageUrl,
          fullName,
        });
      }
    };

    initializeAuthState();
  }, []);

  const onLoginSuccess = (
    jwt: string,
    profileImageUrl: string,
    fullName: string
  ) => {
    setAuthState({
      jwt,
      authenticated: true,
      profileImageUrl,
      fullName,
    });
    SecureStore.setItemAsync("jwt", jwt);
    SecureStore.setItemAsync("profileImageUrl", profileImageUrl);
    SecureStore.setItemAsync("userFullName", fullName);
  };

  const logout = () => {
    setAuthState({
      jwt: null,
      authenticated: false,
      profileImageUrl: null,
      fullName: null,
    });
    SecureStore.deleteItemAsync("jwt");
    SecureStore.deleteItemAsync("profileImageUrl");
    SecureStore.deleteItemAsync("userFullName");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        onLoginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
