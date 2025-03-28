
/**
 * Generates a realistic-looking (but fake) API key with the specified prefix
 * and format similar to those used by popular API services
 */
export const generateApiKey = (prefix: string = 'tm', length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Generate a timestamp component (first 8 chars)
  const timestamp = Date.now().toString(36).slice(-8).padStart(8, '0');
  
  // Generate remaining random characters
  const remainingLength = length - 8 - prefix.length - 2; // 2 for separators
  for (let i = 0; i < remainingLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Format the key with prefix and separators
  return `${prefix}_${timestamp}_${result}`;
};

/**
 * Generate a publishable key (meant to be public)
 */
export const generatePublishableKey = (): string => {
  return generateApiKey('pk', 32);
};

/**
 * Generate a secret key (meant to be private)
 */
export const generateSecretKey = (): string => {
  return generateApiKey('sk', 40);
};

/**
 * Validates whether a key matches the expected format
 */
export const validateApiKey = (key: string): boolean => {
  // Simple format validation
  const regex = /^(tm|pk|sk)_[a-z0-9]{8}_[A-Za-z0-9]+$/;
  return regex.test(key);
};

/**
 * Formats an API key for display, optionally masking part of it
 */
export const formatApiKey = (key: string, mask: boolean = false): string => {
  if (!key) return '';
  
  const parts = key.split('_');
  if (parts.length !== 3) return key;
  
  if (mask) {
    const prefix = parts[0];
    const timestamp = parts[1];
    const secret = parts[2].substring(0, 4) + '•'.repeat(Math.min(6, parts[2].length - 8)) + parts[2].substring(parts[2].length - 4);
    return `${prefix}_${timestamp}_${secret}`;
  }
  
  return key;
};
