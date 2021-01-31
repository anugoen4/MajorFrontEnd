import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import DataAdmin from './Data'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import './Admin.css'

class Admin extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Admin">
           <AdminSideBar selectPage = "admin"/>
           <DataAdmin />
        </div>
     </>
    );
  }
}

export default Admin;
