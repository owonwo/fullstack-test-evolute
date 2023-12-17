"use client";
import React from "react";
import { safeJsonParse } from "~/libs/utils";
import { exitStates$ } from "~/libs/observables/document";

export function useFormPersist(key: string, getState: () => any) {
  const storage_key = `form:${key}`;

  const data = React.useMemo(() => {
    return safeJsonParse(sessionStorage[storage_key], null);
  }, [storage_key]);

  React.useEffect(() => {
    const handler = exitStates$.subscribe({
      next() {
        sessionStorage[storage_key] = JSON.stringify(getState());
      },
    });

    return () => handler.unsubscribe();
  }, [getState, storage_key]);

  return {
    data,
    clear() {
      delete sessionStorage[storage_key];
    },
  };
}
