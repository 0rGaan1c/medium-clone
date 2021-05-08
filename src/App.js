import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import Home from "./components/Home";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
