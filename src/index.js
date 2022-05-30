import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import {BrowserRouter as Router} from "react-router-dom";

import { ContextProvider } from './components/Context/context';
ReactDOM.render(
    
      <Router>
          <MoralisProvider appId="rjK3A4sPBQfy2VfRpapFwKKqaIM1E20sJUOYHcjO" serverUrl="https://skpmhdbci9mq.usemoralis.com:2053/server">
            <ContextProvider>
              <App />
            </ContextProvider>
          </MoralisProvider>
      </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
