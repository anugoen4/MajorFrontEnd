import React, { Component } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import './Data.css'
import '../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";
import shortid from 'shortid';


function AttendanceCard({date, attendanceCount, attendanceStatus}){
  console.log("Card")
  return (
    <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-3 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '15rem',borderRadius: "25px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <CardBody>
          <CardTitle  style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>Weightage : {attendanceCount}</CardTitle>
          <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Status : {attendanceStatus}</CardSubtitle>
          <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Date : {date}</CardSubtitle>
          </CardBody>
        </Card>
      </Animated>
    </div>
    
  )
}

function ProfileHeaderCard({onClick, courseCode, courseName}){
  return (
    <div className = "col-xsm-6 col-sm-3 col-md-3 col-lg-2 my-3 d-flex justify-content-center">
        <Card style={{ width: '12rem', borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
          onClick = {() => {onClick(courseCode, courseName)}}>
          <CardBody>
            <CardTitle style = {{fontSize: "18px", fontWeight: "bold", fontFamily: "cursive"}}>{courseCode}</CardTitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{courseName}</CardSubtitle>
          </CardBody>
        </Card>
    </div>
  )
}

function AttendanceRowCard({title, score}){
  return (
    <div className = "col-xsm-12 col-sm-12 col-md-6 col-lg-2 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '12rem', height: "125px", borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <CardBody>
            <CardTitle style = {{fontSize: "18px", fontWeight: "bold", fontFamily: "cursive"}}>{title}</CardTitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{score}</CardSubtitle>
          </CardBody>
        </Card>
      </Animated>
    </div>
  )
}



const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
  setTimeout(() => {
      cb();
      resolve();
  }, timeout);
});

export default class Data extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      resp : null,
      subject:null,
      c_name : null,
      c_code: null
    }
  }

  async handleClick(courseCode,courseName){
    try{
      const responseJson = await axios.get(`/fetchAttendanceForASubject?id=17103034&courseCode=${courseCode}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      })

      await setAsyncTimeout(() => {
        this.setState({
          subject: JSON.parse(JSON.stringify(responseJson.data)),
          c_name: courseName,
          c_code: courseCode
         })

    },0);
    }catch(error){
      console.log(error)
    }
  }  


  async componentDidMount(){
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
        }, 1000);
  
    }catch(error){
      console.log(error)
    }  
  }

  render() {
    
    if(this.state.resp === null){
      return(
        <LoopCircleLoading color = "red"/>
      )
    }else if(this.state.subject !== null){
      return(
        <div className = "outer_container_background">
          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                {
                this.state.resp.data.map((item) => {
                  return(
                    <ProfileHeaderCard 
                    onClick={this.handleClick}
                    courseCode = {item.courseCode}
                    courseName = {item.courseName}/>
                  )
                })
              }
          </div>
          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
              <div className = "HeadRow__Data__Marks">
                {this.state.c_code} - {this.state.c_name}
              </div>
          </div>

          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                  <AttendanceRowCard 
                      key={shortid.generate()}
                      title = "Total Lectures"
                      score = {this.state.subject.data.totalLectures}
                  />
                  <AttendanceRowCard 
                      key={shortid.generate()}
                      title = "Lectures Attended"
                      finalMarks = {this.state.subject.data.totalLecturesAttended}
                  />
          </div>
         
          <div className = "row" style = {{justifyContent: "center"}}>
            {
              JSON.stringify(this.state.subject.data) !== '{}'? 
              <div>
                
              </div> 
              : 
              <div style = {{height: "50px", fontSize: "25px", padding: "20px", fontFamily: "cursive", fontWeight: "bold"}}>
                Nothing to Show !
              </div>
            } 
            { this.state.subject.data.attendanceDetails.map((data) => {
                  return (
                    <AttendanceCard  
                      key={shortid.generate()}
                      date = {data.date}
                      attendanceCount ={data.attendanceCount}
                      attendanceStatus = {data.attendanceStatus}/>
                    )
                })
            }
            </div>
        </div>
      )
    }else{
      return(
        <div className = "outer_container_background">
          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                  {
                  this.state.resp.data.map((item) => {
                    return(
                      <ProfileHeaderCard 
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}
                      />
                    )
                  })
                }
            </div>
        </div>
      )
    }
  }
}