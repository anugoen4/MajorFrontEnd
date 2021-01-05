import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar'
import DataAttendance from './Data'
import SideBar from '../SideBar/SideBar'
import './Attendance.css'

class Attendance extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Attendance">
           <SideBar selectPage = "attendance"/>
           <DataAttendance />
        </div>
     </>
    );
  }
}

export default Attendance;
