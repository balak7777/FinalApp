import React from 'react';
import './App.css';
//import * as ReactBootStrap from "react-bootstrap";

//import MyGraphComponent from "./Components/MyGraphComponent";
import WorldData from "./Components/WorldData";

import NavBar from "./Components/Navbar";
import StateWiseData from './Components/StateWiseData';
import DistrictWiseData from './Components/DistrictWiseData';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MapMyIndia from './Components/MayMyIndia';

function App() {
  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div style={{height: "60px"}}> 

        </div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          
          <Route path="/worlddata" component={WorldData}>
            <WorldData />
          </Route>
          <Route path="/statewisedata" component={StateWiseData}>
            <StateWiseData />
          </Route>
          <Route path="/districtwisedata" component={DistrictWiseData}>
            <DistrictWiseData />
          </Route>
          <Route path="/mapmyindia" component={MapMyIndia}>
            <MapMyIndia />
          </Route>
          <Route path="/" component={StateWiseData}>
            <StateWiseData />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
