import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import DataHome from './Data'
import './Home.css'

class Home extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Home">
           <SideBar selectPage = "home"/>
           <DataHome />
        </div>
     </>
    );
  }
}

export default Home;
