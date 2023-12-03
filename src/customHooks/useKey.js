import { useEffect } from "react";

export function useKey(Key, actions) {
  // This effect for escape
  useEffect(() => {
    function callBack(event) {
      if (event.code.toLowerCase() === Key.toLowerCase()) {
        actions();
        console.log("Closing");
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [actions, Key]);
}
