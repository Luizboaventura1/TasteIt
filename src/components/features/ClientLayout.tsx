"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import AppInitializer from "@/lib/AppInitializer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppInitializer>{children}</AppInitializer>
      </Provider>
    </QueryClientProvider>
  );
}
