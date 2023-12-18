"use client";
import { queryClient } from "~/config/http";
import { QueryClientProvider } from "react-query";
import React from "react";

export function QueryRootClient(props: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
