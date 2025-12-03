/**
 * Utility functions for sanitizing and validating user inputs
 */

/**
 * Sanitizes input by trimming whitespace and removing control characters
 * Should be used for all non-password inputs
 * Note: Additional context-specific validation (e.g., for HTML contexts) should be 
 * performed at the backend to prevent XSS and injection attacks
 */
export const sanitizeInput = (value: string): string => {
  // Trim whitespace and remove control characters (except newlines/tabs if needed)
  return value.trim().replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Validates email format using a more comprehensive regex pattern
 * Returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // More comprehensive email validation regex following RFC 5322 standards
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters (increased from 6)
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePasswordStrength = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is strong' };
};

/**
 * Sanitizes an object of form data by trimming all string values except passwords
 * @param data - The form data object
 * @param passwordFields - Array of field names that should not be trimmed (e.g., ['password', 'confirmPassword'])
 */
export const sanitizeFormData = <T extends Record<string, string | number | boolean | Date>>(
  data: T,
  passwordFields: string[] = []
): T => {
  const sanitized = { ...data };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string' && !passwordFields.includes(key)) {
      sanitized[key] = sanitizeInput(sanitized[key] as string) as T[Extract<keyof T, string>];
    }
  }
  
  return sanitized;
};
