import React, { Component } from 'react'
import './AdminSideBar.css'
import AdminSideBarRow from './AdminSideBarRow'
import HomeIcon from '@material-ui/icons/Home'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PersonIcon from '@material-ui/icons/Person';

export default class SideBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedPage : this.props.selectPage
    }
  }


  render() {
    return (
      <div className = "OuterContainer__AdminSideBar">
        <AdminSideBarRow link = 'admin' selected = {this.state.selectedPage === 'admin'} Icon = {HomeIcon} title = "Home Admin"/>
        <AdminSideBarRow link = 'adminprofile' selected = {this.state.selectedPage === 'adminprofile'} Icon = {LibraryBooksIcon} title = "Admin Profile"/>
        {/* <AdminSideBarRow link = 'marks' selected = {this.state.selectedPage === 'marks'} Icon = {SchoolIcon} title = "Marks"/> */}
        {/* <AdminSideBarRow link = 'attendance' selected = {this.state.selectedPage === 'attendance'} Icon = {PermContactCalendarIcon} title = "Attendance"/> */}
	      <br />
        <br />
        <br />
        <br />
        <AdminSideBarRow link = 'adminpage' selected = {this.state.selectedPage === 'adminpage'} Icon = {PersonIcon} title = "Admin Page"/>
        <AdminSideBarRow link = 'logout' selected = {this.state.selectedPage === 'logout'} Icon = {ExitToAppIcon} title = "Log Out"/>
      </div>
    )
  }
}
