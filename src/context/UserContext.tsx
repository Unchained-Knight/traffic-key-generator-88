
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getCurrentUser, setCurrentUser, mockUsers } from '@/utils/accessControl';

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  
  const login = (newUser: User) => {
    setCurrentUser(newUser);
    setUser(newUser);
    // In a real app, you might store this in localStorage or a secure cookie
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    localStorage.removeItem('currentUser');
  };
  
  // Check for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        login(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAdmin: user?.role === 'admin' 
    }}>
      {children}
    </UserContext.Provider>
  );
};
