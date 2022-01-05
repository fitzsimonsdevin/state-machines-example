import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { inspect } from "@xstate/inspect";

import Dog from "./routes/dog";
import Dog2 from "./routes/dog2";
import Main from "./routes/main";
import Testing from "./routes/testing";

inspect({
  iframe: false,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App h-screen">
        <header className="flex justify-around bg-purple-300 py-4">
          <Link to="/">Dog</Link>
          <Link to="/dog2">Dog2</Link>
          <Link to="/main">Intro Examples</Link>
          <Link to="/testing">Testing with Context</Link>
        </header>
        <Routes>
          <Route path="/" element={<Dog />} />
          <Route path="dog2" element={<Dog2 />} />
          <Route path="main" element={<Main />} />
          <Route path="testing" element={<Testing />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
