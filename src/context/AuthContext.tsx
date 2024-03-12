import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, userLogin } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
  role: string;
  content: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //fetch if the user's cookies are valid then skip login
    async function checkUserStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser(user);
        setIsLoggedIn(true);
      }
    }
    checkUserStatus();
  }, []);
  const login = async (email: string, password: string) => {
    const data = await userLogin(email, password);
    if (data) {
      setUser(data);
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};

export const userAuth = () => useContext(AuthContext);
