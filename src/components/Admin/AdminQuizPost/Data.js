import React, { Component } from 'react'
import './Data.css'
import Avatar from '@material-ui/core/Avatar';
import Image from '../../../assets/anurag.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import '../../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Link, Redirect} from 'react-router-dom'


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



export default class Data extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      resp: null,
      quizSubjectCode: null,

      quizTitle : "",
      quizInstructions : "",
      quizDate : '',
      quizSyllabus: '',
      quizTotalMarks: '',
      quizWeightage : '',
      
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this)
    this.onChangeQuizInstructions = this.onChangeQuizInstructions.bind(this)
    this.onChangeQuizDate = this.onChangeQuizDate.bind(this)
    this.onChangeQuizSyllabus = this.onChangeQuizSyllabus.bind(this)
    this.onChangeQuizTotalMarks = this.onChangeQuizTotalMarks.bind(this)
    this.onChangeQuizWeightage = this.onChangeQuizWeightage.bind(this)
}

onChangeQuizTitle(event){
  this.setState({
      quizTitle : event.target.value
  })
}

onChangeQuizInstructions(event){
  this.setState({
      quizInstructions : event.target.value
  })
}

onChangeQuizDate(event){
  this.setState({
      quizDate : event.target.value
  })
}

onChangeQuizSyllabus(event){
  this.setState({
      quizSyllabus : event.target.value
  })
}

onChangeQuizTotalMarks(event){
  this.setState({
      quizTotalMarks : event.target.value
  })
}

onChangeQuizWeightage(event){
  this.setState({
      quizWeightage : event.target.value
  })
}

onSubmit(event){
  event.preventDefault();
  const obj = {
      quizTitle :this.state.quizTitle,
      quizInstructions : this.state.quizInstructions,
      quizDate : this.state.quizDate,
      quizSyllabus: this.state.quizSyllabus,
      quizTotalMarks: this.state.quizTotalMarks,
      quizWeightage : this.state.quizWeightage,
      quizSubjectCode: this.state.quizSubjectCode
  }

    axios.post(`/teacher/postAQuiz?teacherId=17103034?courseCode=${obj.quizSubjectCode}`,obj)
    .then((response) => {
        console.log(response);
    })

      alert("Posted")
      console.log(obj)
}

handleClick(id){
  alert(id)
  this.setState({
    quizSubjectCode: id,
    quizTitle : "",
    quizInstructions : "",
    quizDate : '',
    quizSyllabus: '',
    quizTotalMarks: '',
    quizWeightage : '',
  })
}

async componentDidMount(){
  setInterval(() => this.setState({ time: Date.now()}), 1000)
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
    const email = JSON.parse(localStorage.getItem('admin_login'))?.data.email;
    const password = JSON.parse(localStorage.getItem('admin_login'))?.data.password;
    const type = JSON.parse(localStorage.getItem('admin_login'))?.data.type;
   

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
    }else{
      if(this.state.quizSubjectCode === null){
        return (
          <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                    {
                    this.state.resp.data.map((item) => {
                      return(
                        <ProfileHeaderCard 
                        subjectCode = {this.state.quizSubjectCode}
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
                        subjectCode = {this.state.quizSubjectCode}
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}/>
                      )
                    })
                  }
            </div>
            

            <div className = "InnerContainer__Data__AdminQuizPost">
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                      <div  className = "form-check form-check-inline">
                        <div style = {{marginRight: "15px"}}>
                            <label>Title :</label>
                            <input type = "text" 
                                className = "form-control"
                                value = {this.state.quizTitle}
                                onChange = {this.onChangeQuizTitle}
                            />
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label> Weightage :</label>
                            <input type = "text" 
                                className = "form-control"
                                placeholder = "%"
                                value = {this.state.quizWeightage}
                                onChange = {this.onChangeQuizWeightage}
                            />
                        </div>
                      </div>
                    </div>

                    
                    <div className = "form-group">
                      <div className = "form-check form-check-inline">
                        <div style = {{marginRight: "15px"}}>
                          <label>Date :</label>
                          <input type = "text" 
                              className = "form-control"
                              placeholder = "DD/MM/YYYY"
                              value = {this.state.quizDate}
                              onChange = {this.onChangeQuizDate}
                          />
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label>Total Marks :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.quizTotalMarks}
                              onChange = {this.onChangeQuizTotalMarks}
                          />
                        </div>
                      </div>
                    </div>

                    <div className = "form-group">
                        <label>Instructions :</label>
                        <textarea
                            className = "form-control"
                            value = {this.state.quizInstructions}
                            onChange = {this.onChangeQuizInstructions}
                        />
                    </div>

                    <div className = 'form-group'>
                        <label>Syllabus :</label>
                        <textarea
                            className = "form-control"
                            value = {this.state.quizSyllabus}
                            onChange = {this.onChangeQuizSyllabus}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" 
                            value = "Post" 
                            className = "btn btn-primary" 
                            style = {{width : "40%"}} 
                        />
                    </div>             
                </form>
            </div>

          </div>
        )
      }
      
    }
  }
}
