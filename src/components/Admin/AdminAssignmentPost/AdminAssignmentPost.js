import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminAssignmentPost.css'

class AdminAssignmentPost extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminAssignmentPost">
          <AdminSideBar selectPage = "adminassignmentpost"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminAssignmentPost;
