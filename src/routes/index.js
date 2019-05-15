import React from 'react';
import {BrowserRouter,  Route,Switch} from 'react-router-dom';
import SignIn from '../components/SignIn/SignIn'


export default ()=>(
  <BrowserRouter>
    <Switch>
    <Route exact path='/signin' component={SignIn}/>

</Switch>
  </BrowserRouter>

)
