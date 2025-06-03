import store from "@/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../globals.css";
import AppInitializer from "./AppInitializer";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Component {...pageProps} />
      </AppInitializer>
    </Provider>
  );
}

export default App;
