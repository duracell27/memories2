import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import Auth from "./Auth/Auth";


function App() {


  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/auth' exact component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
