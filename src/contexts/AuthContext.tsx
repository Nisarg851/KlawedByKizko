import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

// Simple auth configuration
const ADMIN_EMAIL = 'kizko@example.com';
const ADMIN_PASSWORD = 'admin123';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from session storage
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = {
        uid: '1',
        email: ADMIN_EMAIL,
        isAdmin: true
      };
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      throw new Error('Invalid email or password');
    }
  }

  async function logout() {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  }

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}