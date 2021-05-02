import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminQuizPost.css'

class AdminQuizPost extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminQuizPost">
          <AdminSideBar selectPage = "adminquizpost"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminQuizPost;
