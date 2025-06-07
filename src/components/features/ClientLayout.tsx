"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import AppInitializer from "@/lib/AppInitializer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
