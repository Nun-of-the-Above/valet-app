import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoadedAuth, setIsLoadedAuth] = useState(false);

  useEffect(() => {
    // Simulate initial auth state check
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoadedAuth(true);
  }, []);

  const login = async (email) => {
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = { email, uid: uuidv4() };
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (email) => {
    // Mock register delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = { email, uid: uuidv4() };
    setUser(mockUser);
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
    console.log("Registered as ", mockUser.email);
  };

  const logout = async () => {
    // Mock logout delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    setUser(null);
    localStorage.removeItem("mockUser");
    console.log("User logged out");
  };

  const registerWithRandomEmail = async () => {
    const email = uuidv4() + "@gmail.com";
    await register(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadedAuth,
        login,
        logout,
        register,
        registerWithRandomEmail,
      }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
