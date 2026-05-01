'use client'

import { useEffect, useState } from "react"

export const LOCAL_STORAGE_KEY = "INVESTMENTS";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const value = window.localStorage.getItem(key);
      if (!value) {
        return initialValue;
      }

      // const decryptedValue = window.atob(value);
      const decryptedValue = value;

      return JSON.parse(decryptedValue) as T;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);

      return initialValue;
    }
    
  });
  
  useEffect(() => {
     if (typeof window === "undefined") {
      return;
    }
    
    try {
      const stringifiedValue = JSON.stringify(storedValue);
      // const encryptedValue = window.btoa(stringifiedValue);
      window.localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error("Error setting localStorage key “" + key + "”:", error);
    }
    
  }, [storedValue])

  return [storedValue, setStoredValue] as const;
}