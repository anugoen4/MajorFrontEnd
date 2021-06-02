import React, { Component } from 'react'
import './AdminSideBar.css'
import AdminSideBarRow from './AdminSideBarRow'
import HomeIcon from '@material-ui/icons/Home'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import PersonIcon from '@material-ui/icons/Person';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GradeIcon from '@material-ui/icons/Grade';
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
        <AdminSideBarRow link = 'admin' selected = {this.state.selectedPage === 'admin'} Icon = {HomeIcon} title = "Home"/>
        <AdminSideBarRow link = 'adminquizpost' selected = {this.state.selectedPage === 'adminquizpost'} Icon = {ArrowUpwardIcon} title = "Upload a Quiz"/>
        <AdminSideBarRow link = 'adminassignmentpost' selected = {this.state.selectedPage === 'adminassignmentpost'} Icon = {ArrowUpwardIcon} title = "Upload an Assignment"/>
        <AdminSideBarRow link = 'adminmarksupdate' selected = {this.state.selectedPage === 'adminmarksupdate'} Icon = {SchoolIcon} title = "Update Marks"/>
        <AdminSideBarRow link = 'adminattendanceupdate' selected = {this.state.selectedPage === 'adminattendanceupdate'} Icon = {SchoolIcon} title = "Update Attendance"/>
	      <AdminSideBarRow link = 'adminaddevaluation' selected = {this.state.selectedPage === 'adminaddevaluation'} Icon = {GradeIcon} title = "Add Evaluation Criteria"/>
        <AdminSideBarRow link = 'adminpost' selected = {this.state.selectedPage === 'adminpost'} Icon = {ArrowUpwardIcon} title = "Dynamic Drop"/>
	      <br />
        <br />
        <br />
        <br />
        <AdminSideBarRow link = 'adminprofile' selected = {this.state.selectedPage === 'adminprofile'} Icon = {PersonIcon} title = "Profile"/>
        <AdminSideBarRow link = 'logout' selected = {this.state.selectedPage === 'logout'} Icon = {ExitToAppIcon} title = "Log Out"/>
      </div>
    )
  }
}
