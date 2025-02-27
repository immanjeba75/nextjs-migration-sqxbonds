import { isClient } from '../utils/isClient';

/**
 * Safe localStorage wrapper that works in both client and server environments
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isClient()) {
      return localStorage.getItem(key);
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (isClient()) {
      localStorage.setItem(key, value);
    }
  },
  
  removeItem: (key: string): void => {
    if (isClient()) {
      localStorage.removeItem(key);
    }
  }
};