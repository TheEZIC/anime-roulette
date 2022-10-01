import {useRef, useCallback} from "react";

export const useDebounce = (callback: () => void, delay: number = 300) => {
  const timer = useRef<any>();

  const debounce = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => callback(), delay);
  }, [callback, delay]);

  return debounce;
}
