import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import App from "./App";

//redux
import { Provider } from "react-redux";
import store from "./services/features/store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let eaglePrsist = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={eaglePrsist}>
        <App />
      </PersistGate>     
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
