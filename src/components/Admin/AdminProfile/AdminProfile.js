import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminProfile from './Data'
import './AdminProfile.css'

class AdminProfile extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminProfile">
           <AdminSideBar selectPage = "adminprofile"/>
           <DataAdminProfile />
        </div>
     </>
    );
  }
}

export default AdminProfile;
