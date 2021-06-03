import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import DataEvaluation from './Data'
import './Evaluation.css'

class Evaluation extends Component {
  render(){
    return (
      <>
        <NavBar />
        <div className = "OuterContainer__Evaluation">
           <SideBar selectPage = "evaluation"/>
           <DataEvaluation />
        </div>
     </>
    );
  }
}

export default Evaluation;
