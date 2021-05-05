import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminMarksUpdate.css'

class AdminMarksUpdate extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminMarksUpdate">
          <AdminSideBar selectPage = "adminmarksupdate"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminMarksUpdate;
