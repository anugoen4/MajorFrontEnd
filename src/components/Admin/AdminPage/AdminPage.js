import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminPage.css'

class AdminPage extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminPage">
          <AdminSideBar selectPage = "adminpage"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminPage;
