import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey, functionName } from './supabase/info';

interface User {
  id: string;
  type: 'kid' | 'parent' | 'leader' | 'admin';
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  age?: number;
  birthday?: string;
  title?: string;
  country?: string;
  visitCount?: number;
  lastVisit?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  trackPageVisit: (page: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('kidspiration_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('kidspiration_user');
      }
    }
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('kidspiration_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kidspiration_user');
  };

  const trackPageVisit = async (page: string) => {
    if (!user) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/analytics/page-visit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            page,
            userId: user.id,
            userType: user.type,
          }),
        }
      );
    } catch (error) {
      console.error('Failed to track page visit:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.type === 'admin',
        login,
        logout,
        trackPageVisit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
