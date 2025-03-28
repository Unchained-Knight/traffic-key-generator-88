
import { toast } from "sonner";

const generateRandomString = (length: number, prefix: string, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  let result = prefix;
  for (let i = 0; i < length - prefix.length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generatePublishableKey = (): string => {
  return generateRandomString(24, 'pk_');
};

export const generateSecretKey = (): string => {
  return generateRandomString(24, 'sk_');
};

// Format the API key with hidden parts for display
export const formatApiKey = (key: string, isSecret: boolean = false): string => {
  if (!key) return '';
  
  if (isSecret) {
    // Only show prefix and last 4 chars of secret key
    const prefix = key.substring(0, 3);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(key.length - 7)}${suffix}`;
  } else {
    // Show more of the publishable key
    return key;
  }
};

// Simulate API key validation against a server
export const validateApiKey = async (key: string): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - check prefix and length
    if ((key.startsWith('pk_') || key.startsWith('sk_')) && key.length >= 20) {
      return true;
    }
    
    throw new Error('Invalid API key format');
  } catch (error) {
    console.error('API key validation error:', error);
    toast.error('Failed to validate API key');
    return false;
  }
};
