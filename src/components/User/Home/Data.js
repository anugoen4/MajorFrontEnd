import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import './Data.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import '../../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";
import shortid from 'shortid';

function FeedCardA({assignmentSubjectCode, assignmentSubjectName, assignmentTitle, deadlineDate, deadlineTimings, description}){
  return (
    <div className = "col-xsm-12 col-sm-12 col-md-6 col-lg-3 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '18rem', borderRadius: "25px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          {/* <CardImg variant="top" style = {{height: "150px", borderRadius: "25px"}}
          src = "https://img.freepik.com/free-vector/realistic-golden-trophy-with-gold-laurel-wreath_48799-144.jpg?size=338&ext=jpg"/> */}
          <CardBody>
            <CardTitle  style = {{fontSize: "20px", fontWeight: "bold", fontFamily: "cursive"}}>{assignmentSubjectCode}</CardTitle>
            <CardSubtitle style = {{fontWeight: "bold",textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{assignmentSubjectName}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{assignmentTitle}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Deadline Date --> {deadlineDate}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Deadline Timings --> {deadlineTimings}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Description --> {description}</CardSubtitle>
          </CardBody>
        </Card>
      </Animated>
    </div>
        
  )
}

function FeedCardQ({quizSubjectCode, quizSubjectName, quizTitle, quizDate, quizTimings, syllabus, quizInstructions}){
  return (
    <div className = "col-xsm-12 col-sm-12 col-md-6 col-lg-3 my-3 d-flex justify-content-center">
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
        <Card style={{ width: '18rem', borderRadius: "25px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          {/* <CardImg variant="top" style = {{height: "150px", borderRadius: "25px"}}
          src = "https://img.freepik.com/free-vector/realistic-golden-trophy-with-gold-laurel-wreath_48799-144.jpg?size=338&ext=jpg"/> */}
          <CardBody>
            <CardTitle  style = {{fontSize: "20px", fontWeight: "bold", fontFamily: "cursive"}}>{quizSubjectCode}</CardTitle>
            <CardSubtitle style = {{fontWeight: "bold",textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{quizSubjectName}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{quizTitle}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Quiz Date --> {quizDate}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Quiz Timings --> {quizTimings}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Syllabus --> {syllabus}</CardSubtitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Instructions --> {quizInstructions}</CardSubtitle>
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

class Data extends Component {
  constructor(props){
    super(props); 
    
    this.state = {
      assignmentFeed:null,
      quizFeed:null,
    }
}

async componentDidMount(){
  setInterval(() => this.setState({ time: Date.now()}), 100000)
  try{
    const responseJson = await axios.get('/fetchAssignmentFeed/17103034', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

    console.log(responseJson)

     await setAsyncTimeout(() => {
      this.setState({
        assignmentFeed: JSON.parse(JSON.stringify(responseJson.data))
        // resp: this.state.res
       })
  }, 1000);

  }catch(error){
    console.log(error)
  }

  try{
    const responseJson = await axios.get('/fetchQuizFeed/17103034', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

    console.log(responseJson)

     await setAsyncTimeout(() => {
      this.setState({
        quizFeed: JSON.parse(JSON.stringify(responseJson.data))
        // resp: this.state.res
       })
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
    }else if(this.state.assignmentFeed === null || this.state.quizFeed === null){
      return(
        <LoopCircleLoading color = "red"/>
      )
    }else{
      return (
        <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                <div className = "HeadRow__Data__Home">
                  Assignment Feed
                </div>
            </div>
           <div className = "row" style = {{justifyContent: "center"}}>
            {
              this.state.assignmentFeed.data.map((item)=> {
                  return(
                    <FeedCardA
                        key = {item.assignmentSubjectCode}
                        assignmentSubjectCode = {item.assignmentSubjectCode}
                        assignmentSubjectName = {item.assignmentSubjectName}
                        assignmentTitle = {item.assignmentTitle}
                        deadlineDate = {item.deadlineDate}
                        deadlineTimings = {item.deadlineTimings}
                        description = {item.description}
                    />
                  )
              })
            }
           </div>
  
           <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                <div className = "HeadRow__Data__Home">
                  Quiz Feed
                </div>
            </div>
            <div className = "row" style = {{justifyContent: "center"}}>
            {
              this.state.quizFeed.data.map((item)=> {
                  return(
                    <FeedCardQ
                        key = {item.quizSubjectCode}
                        quizSubjectCode = {item.quizSubjectCode}
                        quizSubjectName = {item.quizSubjectName}
                        quizTitle = {item.quizTitle}
                        quizDate = {item.quizDate}
                        quizTimings = {item.quizTimings} 
                        syllabus = {item.syllabus}
                        quizInstructions = {item.quizInstructions}
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

export default Data
