import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import DataAdminPage from './Data'
import './AdminAddEvaluation.css'

class AdminAddEvaluation extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__AdminAddEvaluation">
          <AdminSideBar selectPage = "adminaddevaluation"/>
          <DataAdminPage />
        </div>
     </>
    );
  }
}

export default AdminAddEvaluation;
