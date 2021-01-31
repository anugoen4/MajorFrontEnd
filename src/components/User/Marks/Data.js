import React, { Component } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './Data.css'
import '../../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";
import shortid from 'shortid';
import {Link, Redirect} from 'react-router-dom';

function MarksCard({evaluationType, marksObtained, maximumMarks, description}){
  return (
    <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-3 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '15rem', borderRadius: "25px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          {/* <CardImg variant="top" style = {{height: "150px", borderRadius: "25px"}}
          src = "https://img.freepik.com/free-vector/realistic-golden-trophy-with-gold-laurel-wreath_48799-144.jpg?size=338&ext=jpg"/> */}
          <CardBody>
            <CardTitle  style = {{fontSize: "20px", fontWeight: "bold", fontFamily: "cursive"}}>{evaluationType}</CardTitle>
            <CardSubtitle style = {{fontWeight: "bold",textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{description}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>My Marks --> {marksObtained}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Total Marks --> {maximumMarks}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Score --> {(marksObtained / maximumMarks) * 100} %</CardSubtitle>
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

function GradeCard({title, score}){
  return (
    <div className = "col-xsm-12 col-sm-12 col-md-6 col-lg-2 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '12rem', borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
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
    var today = new Date()
    this.state = {
      resp:null,
      subject: null,
      c_name:null,
      c_code:null
  };
}

async handleClick(courseCode,courseName){
  try{
    const responseJson = await axios.get(`/fetchMarksForASubject?id=17103034&courseCode=${courseCode}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

    // this.setState({
    //   resp: JSON.parse(JSON.stringify(responseJson.data))
    //  })

     await setAsyncTimeout(() => {
      this.setState({
        subject: JSON.parse(JSON.stringify(responseJson.data)),
        c_name: courseName,
        c_code: courseCode
       })
  },0);
  console.log(this.state.subject)
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

    // this.setState({
    //   resp: JSON.parse(JSON.stringify(responseJson.data))
    //  })

     await setAsyncTimeout(() => {
      this.setState({
        resp: JSON.parse(JSON.stringify(responseJson.data))
       })
  }, 1000);

  }catch(error){
    console.log(error)
  }
      
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now()}), 1000)
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
  }
    
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
                {this.state.c_name} - {this.state.c_code}
              </div>
          </div>

          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                  <GradeCard 
                      key={shortid.generate()}
                      title = "Final Marks"
                      score = {this.state.subject.data.finalMarksObtained}
                  />
                  <GradeCard 
                      key={shortid.generate()}
                      title = "Final Grade"
                      finalMarks = {this.state.subject.data.finalGradeObtained}
                  />
          </div>

              <div className = "row" style = {{justifyContent: "center"}}>
                {
                  JSON.stringify(this.state.subject.data.marksDistribution) !== '{}'? 
                  <div>
                    
                  </div> 
                  : 
                  <div style = {{height: "50px", fontSize: "25px", padding: "20px", fontFamily: "cursive", fontWeight: "bold"}}>
                    Nothing to Show !
                  </div>
                }
                {
                  Object.keys(this.state.subject.data.marksDistribution).map((type) => {
                  return(
                  // console.log(type_1, this.state.res.data[type][type_1])
                  <>
                 
                      { this.state.subject.data.marksDistribution[type].map((data) => {
                            console.log(data)
                            return (
                              <MarksCard
                                key={shortid.generate()}
                                evaluationType = {type}
                                marksObtained = {data.marksObtained}
                                maximumMarks = {data.maximumMarks}
                                description = {data.description}/>
                              )
                          })
                      }
                    </>
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
                      courseName = {item.courseName}/>
                    )
                  })
                }
            </div>
        </div>
      )
    }
  }
}
  