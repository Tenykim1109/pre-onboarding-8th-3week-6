import { useState } from 'react';
import { FormEvent } from "../components/type/type";

export default function useSearch() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");

  const focusHandler = (type: string) => {
    type === "focus" ? setIsFocus(true) : setIsFocus(false);
  };

  const focusOn = () => {
    document.getElementById("searchInput")?.focus();
  };

  let storageInit = localStorage.getItem("searched")?.split(",");

  const [localStorageData, setlocalStorageData] = useState<any>(storageInit);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchWord !== "") {
      if (!localStorage.getItem("searched")) {
        localStorage.setItem("searched", searchWord);
        setlocalStorageData([searchWord]);
      } else {
        let newStorage = `${localStorage.getItem(
          "searched"
        )},${searchWord}`.split(",");
        let newStorageSet = newStorage.filter((item, index) => {
          return newStorage.indexOf(item) === index;
        });
        localStorage.setItem("searched", `${newStorageSet}`);
        setlocalStorageData(newStorageSet);
      }
      setSearchWord("");
    }
  };
  
  return {isFocus, searchWord, localStorageData, setlocalStorageData, setSearchWord, focusHandler, focusOn, onSubmit}
}

