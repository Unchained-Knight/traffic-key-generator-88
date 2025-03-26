
// Define user roles
export type UserRole = 'admin' | 'viewer';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  apiKey: string;
}

// Mock current user - in a real app, this would come from authentication
let currentUser: User | null = null;

// Set the current user
export const setCurrentUser = (user: User | null) => {
  currentUser = user;
};

// Get the current user
export const getCurrentUser = (): User | null => {
  return currentUser;
};

// Check if current user is admin
export const isAdmin = (): boolean => {
  return currentUser?.role === 'admin';
};

// Check if user has permission to perform an action
export const hasPermission = (action: 'view' | 'edit'): boolean => {
  if (!currentUser) return false;
  
  if (action === 'view') {
    // All authenticated users can view
    return true;
  } else if (action === 'edit') {
    // Only admins can edit
    return currentUser.role === 'admin';
  }
  
  return false;
};

// Mock user database - in a real app, this would be in your Supabase/database
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@trafficmanager.com',
    role: 'admin',
    apiKey: 'sk_admin_12345'
  },
  {
    id: '2',
    name: 'Viewer User',
    email: 'viewer@trafficmanager.com',
    role: 'viewer',
    apiKey: 'pk_viewer_67890'
  }
];

// Function to login with email
export const loginWithEmail = (email: string, password: string): User | null => {
  // In a real app, this would validate credentials against your database
  // This is just a mock implementation
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

// Function to logout
export const logout = () => {
  setCurrentUser(null);
};
