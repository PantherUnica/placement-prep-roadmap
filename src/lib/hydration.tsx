import { useEffect, useState } from "react";
import { useCareerStore } from "./store";

let rehydrated = false;

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (!rehydrated) {
      rehydrated = true;
      useCareerStore.persist.rehydrate();
    }
    setHydrated(true);
  }, []);
  return hydrated;
}
