import { useState } from 'react';
import { KeyEvent } from "../components/type/type";

export default function useDebounce() {
  // search requset optimizaition
  const [keyInUse, setKeyInUse] = useState(false);
  
  const keyCheck = (e: KeyEvent, type: string) => {
    if (type === "up") {
      if (e.code.indexOf("Key") === 0) {
        setTimeout(() => {
          setKeyInUse(false);
        }, 400);
      }
    } else if (type === "down") {
      setKeyInUse(true);
    }
    // tabIndex ArrowKey contral start
    if (e.key === "ArrowDown") {
      document.getElementById("searchList0")?.focus();
    }
  };
  
  return {keyInUse, keyCheck}
}

