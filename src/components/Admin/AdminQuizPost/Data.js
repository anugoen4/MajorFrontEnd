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
import Select from 'react-select'


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
      quizId: '',
      quizSubjectCode: null,
      quizTitle : "",
      quizInstructions : "",
      quizDate : '',
      syllabus: '',
      quizTimings: ''  ,
      
      list :[],

    resList : []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this)
    this.onChangeQuizInstructions = this.onChangeQuizInstructions.bind(this)
    this.onChangeQuizDate = this.onChangeQuizDate.bind(this)
    this.onChangesyllabus = this.onChangesyllabus.bind(this)
    this.onChangeQuizTimings = this.onChangeQuizTimings.bind(this)
  
}

onChangeQuizTitle(event){
  this.setState({
    quizTitle : event.label,
    quizId: event.value
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

onChangesyllabus(event){
  this.setState({
      syllabus : event.target.value
  })
}

onChangeQuizTimings(event){
  this.setState({
      quizTimings : event.target.value
  })
}



onSubmit(event){
  event.preventDefault();
  const obj = {
      evaluationComponentId: this.state.quizId,
      quizTitle :this.state.quizTitle,
      quizDate : this.state.quizDate,
      quizTimings: this.state.quizTimings,
      syllabus: this.state.syllabus,
      quizInstructions : this.state.quizInstructions,
  }


  console.log(obj)
    axios.post(`/teacher/postAQuiz?teacherId=1&courseCode=${this.state.quizSubjectCode}`,obj)
    .then((response) => {
        console.log(response);
    })

    alert("Posted")
    this.setState({
      quizTitle : "",
      quizInstructions : "",
      quizDate : '',
      syllabus: '',
      quizTimings: ''
    })

    window.location.reload()
}

async handleClick(id){
  this.setState({
    quizSubjectCode: id,
    quizTitle : null,
    quizInstructions : "",
    quizDate : '',
    syllabus: '',
    quizTimings: ''
  })


  try{
    const responseJson = await axios.get(`teacher/getEvaluationComponentsForDropDown?teacherId=1&courseCode=${id}&evaluationType=QUIZ`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

     await setAsyncTimeout(() => {
      const _list =  JSON.parse(JSON.stringify(responseJson.data))
      console.log(_list.data)
      const res = _list.data.map((item) => {
        return ({label: item.evaluationTitle, value: item.evaluationComponentId})
      })

      console.log(res)
    
      this.setState({
        resList: res,
        quizSubjectCode: id
      })
  }, 1000);

  }catch(error){
    console.log(error)
  }

  this.state.resList.map((item) => {
    console.log(item)
  })
}


async componentDidMount(){
  setInterval(() => this.setState({ time: Date.now()}), 100000)
  try{
    const responseJson = await axios.get('/teacher/fetchSubjectForATeacher/1', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })

     await setAsyncTimeout(() => {
      this.setState({
        resp: JSON.parse(JSON.stringify(responseJson.data))
        // resp: this.state.res
       })
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
                        <div style = {{marginRight: "15px", width: "400px"}}>
                            <label>Title :</label>
                            <Select options = {this.state.resList}
                              onChange = {this.onChangeQuizTitle}
                              placeholder = "SELECT"
                            />
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
                        <label>Timings :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.quizTimings}
                              onChange = {this.onChangeQuizTimings}
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
                            value = {this.state.syllabus}
                            onChange = {this.onChangesyllabus}
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
