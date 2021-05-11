import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import WriteStory from "./components/Profile/WriteStory";
import Story from "./components/Home/Story";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/profile/write" component={WriteStory} />
            <Route exact path="/:name/:title" component={Story} />
            <Route render={() => <h1>Error 404!</h1>} />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
