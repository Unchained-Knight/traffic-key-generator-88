
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getCurrentUser, setCurrentUser, mockUsers, loginWithEmail, logout as logoutFn } from '@/utils/accessControl';
import { supabase } from '@/utils/supabaseClient';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => null,
  logout: async () => {},
  isAdmin: false,
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await loginWithEmail(email, password);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        // In a real app, you might store this in localStorage or a secure cookie
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      }
      
      return loggedInUser;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutFn();
      setUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check for existing user on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        // In a real app with Supabase auth fully set up, use:
        // const { data } = await supabase.auth.getSession();
        // if (data?.session) { ... }
        
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as User;
            setUser(parsedUser);
            setCurrentUser(parsedUser);
          } catch (e) {
            console.error('Error parsing stored user', e);
            localStorage.removeItem('currentUser');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAdmin: user?.role === 'admin',
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};
