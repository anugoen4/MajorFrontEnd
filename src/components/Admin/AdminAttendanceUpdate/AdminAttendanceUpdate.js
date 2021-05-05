import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminAttendanceUpdate.css'

class AdminAttendanceUpdate extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminAttendanceUpdate">
          <AdminSideBar selectPage = "adminattendanceupdate"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminAttendanceUpdate;
