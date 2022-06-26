import { useCallback, useState } from "react";

// Even though its <T, > T represents the type of initialValue and not the former key
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  console.log(`useLocalStorage rendering`)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      // as window is undefined if we are using SSR or SSG
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `some error occured while getting item from local storage`,
        error
      );
      return initialValue;
    }
  });

  const setValueToLocalStorage = useCallback((value: T) => {
    try {
      setStoredValue(value);
      if (window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`some error occured while setting item to local storage`);
    }
  },[key])

  return [storedValue, setValueToLocalStorage] as const;
};
