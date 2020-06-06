import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Signup} from "./components/user"
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Provider
} from "react-router-dom";
export default function EntryPoint() {
  return (

    <Router>
      <Route path="/" exact component={App} />
          
    <Switch>
        <Route
          path="/signup"
          render={() => <Signup  />}
        />
            </Switch>

    </Router>

  )}



ReactDOM.render(
  <React.StrictMode>
    <EntryPoint/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  /* <Switch>
        <Route
          path="/landingpage"
          render={() => <LandingPage library={library} />}
        />*/
