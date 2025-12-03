/**
 * Utility functions for sanitizing and validating user inputs
 */

/**
 * Trims whitespace from the beginning and end of a string
 * Should be used for all non-password inputs
 */
export const sanitizeInput = (value: string): string => {
  return value.trim();
};

/**
 * Validates email format using a regex pattern
 * Returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
export const sanitizeFormData = <T extends Record<string, any>>(
  data: T,
  passwordFields: string[] = []
): T => {
  const sanitized = { ...data };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string' && !passwordFields.includes(key)) {
      sanitized[key] = sanitizeInput(sanitized[key]);
    }
  }
  
  return sanitized;
};
