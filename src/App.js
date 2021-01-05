import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home'
import Library from './components/Library/Library'
import Marks from './components/Marks/Marks'
import Attendance from './components/Attendance/Attendance'
import Login from './components/Login/Login'
import Logout from './components/LogOut/LogOut'
import Default from './components/Default/Default'
import Profile from './components/Profile/Profile'
import ForgotPassword from './components/Login/ForgotPassword'

class App extends Component {
  render(){
    return (
      <Router>
        <Switch >
          <Route path = "/" exact component = {Login} />
          <Route path = "/forgotpassword" exact component = {ForgotPassword} />
          <Route path = "/home" exact component = {Home} />
          <Route path = "/library" exact component = {Library} />
          <Route path = "/marks" exact component = {Marks} />
          <Route path = "/attendance" exact component = {Attendance} />
	        <Route path = "/profile" exact component = {Profile}/>
          <Route path = "/logout" exact component = {Logout} />
          <Route path = "/"  component = {Default} />
        </Switch>
     </Router>
    );
  }
}

export default App;
