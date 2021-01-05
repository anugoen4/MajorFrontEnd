import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import DataMarks from './Data'
import './Marks.css'

class Marks extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Marks">
           <SideBar selectPage = "marks"/>
           <DataMarks />
        </div>
     </>
    );
  }
}

export default Marks;
