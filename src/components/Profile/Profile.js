import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import DataProfile from './Data'
import './Profile.css'

class Profile extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Profile">
           <SideBar selectPage = "profile"/>
           <DataProfile />
        </div>
     </>
    );
  }
}

export default Profile;
