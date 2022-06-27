import { useEffect, useState } from 'react';

export default function <T>(key: string, initialVal: T | (() => T)) {
  // THIS CODE: gets the value from localStorage or its going to get the
  // initial value that we passed in.
  const getValFromLocalStorage = () => {
    const jsonValue = localStorage.getItem(key);

    if (!jsonValue) {
      if (typeof initialVal === 'function') {
        return (initialVal as () => T)();
      } else {
        return initialVal;
      }
    }

    return JSON.parse(jsonValue);
  };

  const [value, setValue] = useState<T>(getValFromLocalStorage);

  // THIS CODE: sets the value to localStorage whenever key or value is changed.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
