import React, { Component } from 'react'
import './SideBar.css'
import SideBarRow from './SideBarRow'
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
      <div className = "OuterContainer__SideBar">
        
        <SideBarRow link = 'home' selected = {this.state.selectedPage === 'home'} Icon = {HomeIcon} title = "Home"/>
        <SideBarRow link = 'library' selected = {this.state.selectedPage === 'library'} Icon = {LibraryBooksIcon} title = "Library"/>
        <SideBarRow link = 'marks' selected = {this.state.selectedPage === 'marks'} Icon = {SchoolIcon} title = "Marks"/>
        <SideBarRow link = 'attendance' selected = {this.state.selectedPage === 'attendance'} Icon = {PermContactCalendarIcon} title = "Attendance"/>
	      <br />
        <br />
        <br />
        <br />
        <SideBarRow link = 'profile' selected = {this.state.selectedPage === 'profile'} Icon = {PersonIcon} title = "Profile"/>
        <SideBarRow link = 'logout' selected = {this.state.selectedPage === 'logout'} Icon = {ExitToAppIcon} title = "Log Out"/>
      </div>
    )
  }
}
