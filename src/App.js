import React from 'react';
import './App.css';
import * as ReactBootStrap from "react-bootstrap";
import DankMemes from "./Components/DankMemes";
import MyGraphComponent from "./Components/MyGraphComponent";
import WorldData from "./Components/WorldData";
import MoreDeets from "./Components/MoreDeets";
import NavBar from "./Components/Navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <Router>
        <NavBar />
 

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/mygraphcomponent" component={MyGraphComponent}>
              <MyGraphComponent/>
          </Route>
          <Route path="/worlddata" component={WorldData}>
            <WorldData />
          </Route>
          <Route path="/deets" component={MoreDeets}>
            <MoreDeets />
          </Route>
          <Route path="/dankmemes" component={DankMemes}>
            <DankMemes />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
