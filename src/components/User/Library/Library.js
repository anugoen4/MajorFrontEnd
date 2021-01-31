import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import DataLibrary from './Data'
import SideBar from '../SideBar/SideBar'
import './Library.css'

class Library extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Library">
           <SideBar selectPage = "library"/>
           <DataLibrary />
        </div>
     </>
    );
  }
}

export default Library;
