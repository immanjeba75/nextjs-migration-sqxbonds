/**
 * Safe check to determine if code is running on client or server
 */
export const isClient = (): boolean => {
    return typeof window !== 'undefined';
  };