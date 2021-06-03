import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import './Data.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  CardImgOverlay
} from 'reactstrap';
import '../../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";
import shortid from 'shortid';
import { requirePropFactory } from '@material-ui/core';



function EvaluationCard({id,type, title, date, weightage}){
  return (
    <div className = "my-3 d-flex justify-content-center">
        <Card style={{ width: "70vw", height: "6rem" , padding: "10px" ,borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
         <div style = {{display: "flex"}}>
           <div style = {{flex: "0.5", paddingLeft: "10px"}}>
              <div>
                 <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Type -- {type}</CardSubtitle>
              </div>
              <div>
                  <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>D -- {date}</CardSubtitle>
              </div>
           </div>
           <div style = {{flex: "0.5"}}>
              <div>
                <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Title -- {title}</CardSubtitle>
              </div>
              <div>
                <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Weightage -- {weightage}</CardSubtitle>
              </div>
           </div>
          
         </div>
        </Card>
    </div>
  )
}


function ProfileHeaderCard({onClick, subjectCode, courseCode, courseName}){
  if(subjectCode === courseCode){
    return (
      <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-2 my-3 d-flex justify-content-center">
          <Card style={{ width: '12rem', borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", background: "lightblue"}}
            onClick = {() => {onClick(courseCode)}}>
            <CardBody>
              <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>{courseCode}</CardTitle>
              <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{courseName}</CardSubtitle>
            </CardBody>
          </Card>
      </div>
    )
  }else{
    return (
      <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-2 my-3 d-flex justify-content-center">
          <Card style={{ width: '12rem', borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
            onClick = {() => {onClick(courseCode)}}>
            <CardBody>
              <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>{courseCode}</CardTitle>
              <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{courseName}</CardSubtitle>
            </CardBody>
          </Card>
      </div>
   )
  }
  
}

const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
  setTimeout(() => {
      cb();
      resolve();
  }, timeout);
});



class Data extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    
    this.state = {
      resp: null,
      subjectCode: null,
      evalData : null
    }
  }


  async handleClick(id){
    try{
     const responseJson = await axios.get(`/teacher/getEvaluationComponents?teacherId=1&courseCode=${id}`, {
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json',
       }
     })
 
     console.log("response",responseJson.data)
 
     this.setState({
       evalData: JSON.parse(JSON.stringify(responseJson.data))
     }) 
 
   }catch(error){
     console.log(error)
   }
 
   this.setState({
     subjectCode: id
   })
 
   // console.log("Subject Code", this.state.subjectCode)
 }
 

 async componentDidMount(){
  setInterval(() => this.setState({ time:Date.now()}), 1000)
  try{
    const responseJson = await axios.get('/fetchSubjectEnrollments/17103034', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

     await setAsyncTimeout(() => {
      this.setState({
        resp: JSON.parse(JSON.stringify(responseJson.data))
      })

      console.log(this.state.resp)
      
    }, 1000);
  }catch(error){
    console.log(error)
  }
 
      
  }


  render() {
    const email = JSON.parse(localStorage.getItem('user_login'))?.data.email;
    const password = JSON.parse(localStorage.getItem('user_login'))?.data.password;
    const type = JSON.parse(localStorage.getItem('user_login'))?.data.type;
   

    if(email === undefined){
      return(
        <>
            <Redirect to = "/" />
        </>
      )
    }else if(this.state.resp === null){
      return(
        <LoopCircleLoading color = "red"/>
      )
    }else{
      if(this.state.subjectCode === null){
        return (
          <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                    {
                    this.state.resp.data.map((item) => {
                      return(
                        <ProfileHeaderCard 
                        key = {item.courseCode}
                        subjectCode = {this.state.subjectCode}
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}/>
                      )
                    })
                  }
            </div>

          </div>
        )
    }else{
      return (
        <div className = "outer_container_background">
          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                  {
                  this.state.resp.data.map((item) => {
                    return(
                      <ProfileHeaderCard 
                      key = {item.courseCode}
                      subjectCode = {this.state.subjectCode}
                      onClick={this.handleClick}
                      courseCode = {item.courseCode}
                      courseName = {item.courseName}/>
                    )
                  })
                }
          </div>


          {
              this.state.evalData.data.map((item) => {
                return(
                  <EvaluationCard 
                    key = {item.evaluationComponentId}
                    type = {item.evaluationType}
                    id = {item.evaluationComponentId}
                    title = {item.evaluationTitle}
                    date = {item.evaluationDate}
                    weightage = {item.weightAge}
                  />
                )
              })

             
            }

            </div>
      )
      }
    }
  }
}

export default Data
