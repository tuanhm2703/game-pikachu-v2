import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SoundProvider from "./components/SoundProvider";

// --- Viewport Height Fix for Mobile Safari ---
function setRealVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--real-vh', `${vh}px`);
}
window.addEventListener('resize', setRealVh);
window.addEventListener('orientationchange', setRealVh);
setRealVh();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <SoundProvider>
        <Router>
          <App />
        </Router>
      </SoundProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
