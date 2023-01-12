import { useState } from "react";
import type { KeyEvent } from "../types";

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
    if (e.key === "ArrowDown" && !e.nativeEvent.isComposing) {
      document.getElementById("searchList0")?.focus();
    }
  };

  return { keyInUse, keyCheck };
}
