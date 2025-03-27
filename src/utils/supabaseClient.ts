
import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://pjtpuxmwwmwqbgdpzaer.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdHB1eG13d213cWJnZHB6YWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTAyNzEsImV4cCI6MjA1ODU4NjI3MX0.yI1VVliSS7UQ79SiRMV04vaKuZs-cIc5lu4mAPlgNWg';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if user is admin
export const isUserAdmin = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    console.error('Error checking user role:', error);
    return false;
  }
  
  return data.role === 'admin';
};

// Get traffic data with role-based filtering
export const getTrafficData = async () => {
  const { data, error } = await supabase
    .from('traffic_data')
    .select('*');
  
  if (error) {
    console.error('Error fetching traffic data:', error);
    throw error;
  }
  
  return data;
};

// Update traffic data (admin only)
export const updateTrafficData = async (id: number, updates: any) => {
  const { data, error } = await supabase
    .from('traffic_data')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating traffic data:', error);
    throw error;
  }
  
  return data;
};

// Add traffic data (admin only)
export const addTrafficData = async (newData: any) => {
  const { data, error } = await supabase
    .from('traffic_data')
    .insert(newData)
    .select();
  
  if (error) {
    console.error('Error adding traffic data:', error);
    throw error;
  }
  
  return data;
};

// Delete traffic data (admin only)
export const deleteTrafficData = async (id: number) => {
  const { error } = await supabase
    .from('traffic_data')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting traffic data:', error);
    throw error;
  }
  
  return true;
};
