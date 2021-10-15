import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Switch,Route, Redirect } from 'react-router-dom'
import Auth from "./Auth/Auth";
import PostDetails from "./PostDetails/PostDetails";


function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path='/' exact component={()=> <Redirect to={'/posts'}/>}/>
          <Route path='/posts' exact component={Home}/>
          <Route path='/posts/:id' component={PostDetails}/>
          <Route path='/posts/search' exact component={Home}/>
          <Route path='/auth' exact component={()=>(!user? <Auth/> : <Redirect to='/posts'/>)}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
