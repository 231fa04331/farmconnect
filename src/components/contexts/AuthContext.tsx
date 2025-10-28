import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'farmer' | 'investor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
// In AuthContext.tsx - CHANGE THESE LINES:

useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token'); // ✅ CHANGED: 'authToken' → 'token'
      const userData = localStorage.getItem('user'); // ✅ CHANGED: 'userData' → 'user'
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token'); // ✅ CHANGED
      localStorage.removeItem('user'); // ✅ CHANGED
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    setLoading(true);
    
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'Rajesh Kumar',
        email: email,
        userType: 'farmer'
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      localStorage.setItem('token', mockToken); // ✅ CHANGED: 'authToken' → 'token'
      localStorage.setItem('user', JSON.stringify(mockUser)); // ✅ CHANGED: 'userData' → 'user'
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  } finally {
    setLoading(false);
  }
};

const logout = () => {
  setUser(null);
  localStorage.removeItem('token'); // ✅ CHANGED: 'authToken' → 'token'
  localStorage.removeItem('user'); // ✅ CHANGED: 'userData' → 'user'
};
  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;