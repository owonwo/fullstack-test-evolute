"use client";
import React from "react";
import { isSSR, safeJsonParse } from "~/libs/utils";
import { exitStates$ } from "~/libs/observables/document";

export function useFormPersist(key: string, getState: () => any) {
  const storage_key = `form:${key}`;

  const data = React.useMemo(() => {
    return safeJsonParse(storage[storage_key], null);
  }, [storage_key]);

  React.useEffect(() => {
    const handler = exitStates$.subscribe({
      next() {
        storage[storage_key] = JSON.stringify(getState());
      },
    });

    return () => handler.unsubscribe();
  }, [getState, storage_key]);

  return {
    data,
    clear() {
      delete storage[storage_key];
    },
  };
}

const sessionStub = {
  getItem: (key: string) => {},
  removeItem: (key: string) => {},
  setItem: (key: string, value: string) => {},
  clear() {},
  key(index: number): string | null {
    return null;
  },
} as WindowSessionStorage["sessionStorage"];

const storage = isSSR() ? sessionStub : sessionStorage;
