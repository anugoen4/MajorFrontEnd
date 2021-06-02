import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminPost.css'

class AdminPost extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminPost">
          <AdminSideBar selectPage = "adminpost"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminPost;
