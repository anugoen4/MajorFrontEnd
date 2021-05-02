import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/User/Home/Home'
import Library from './components/User/Library/Library'
import Marks from './components/User/Marks/Marks'
import Attendance from './components/User/Attendance/Attendance'
import Login from './components/Login/Login'
import Logout from './components/LogOut/LogOut'
import Default from './components/Default/Default'
import Profile from './components/User/Profile/Profile'
import ForgotPassword from './components/Login/ForgotPassword'
import Admin from './components/Admin/Admin/Admin'
import AdminQuizPost from './components/Admin/AdminQuizPost/AdminQuizPost'
import AdminProfile from './components/Admin/AdminProfile/AdminProfile'
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
          <Route path = "/admin"  exact component = {Admin} />
          <Route path = "/adminquizpost"  exact component = {AdminQuizPost} />
          <Route path = "/adminprofile" exact component = {AdminProfile}/>
          <Route path = "/"  component = {Default} />
          
        </Switch>
     </Router>
    );
  }
}

export default App;
