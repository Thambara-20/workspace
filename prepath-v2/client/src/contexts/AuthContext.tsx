import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from '../hooks/useToast';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (isAuthenticated && !localStorage.getItem("onboardingCompleted")) {
      navigate("/onboarding");
    }
  }, [isAuthenticated, navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      if (response?.refreshToken || response?.accessToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      throw new Error(error?.message || 'Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await apiRegister(username, email, password);
      if (response?.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        setIsAuthenticated(true);
        navigate("/onboarding");
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      showToast(`Register error: ${error.message}`, 'error');
      throw new Error(error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("onboardingCompleted");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}