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
      assignmentSubjectCode: null,
      assignmentId : '',
      assignmentTitle : "",
      assignmentDescription : "",
      assignmentDate : '',
      syllabus: '',
      assignmentTimings: '',
      resList : [],
      isValidDate: false,
      errorsDate: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeAssignmentTitle = this.onChangeAssignmentTitle.bind(this)
    this.onChangeAssignmentDescription = this.onChangeAssignmentDescription.bind(this)
    this.onChangeAssignmentDate = this.onChangeAssignmentDate.bind(this)
    this.onChangesyllabus = this.onChangesyllabus.bind(this)
    this.onChangeAssignmentTimings = this.onChangeAssignmentTimings.bind(this)
  
}

onChangeAssignmentTitle(event){
  this.setState({
      assignmentTitle : event.label,
      assignmentId: event.value
  })
}

onChangeAssignmentDescription(event){
  this.setState({
      assignmentDescription : event.target.value
  })
}

onChangeAssignmentDate(event){
  const val = event.target.value
  var pattern = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/);
  let errors = '';
  let flag = 0
  if(!val){
      errors = "Please Enter Date"
      flag = 0
  }else if(!pattern.test(val)){
      errors = "Please enter valid Date "
      flag = 0
  }else{
      errors = "Entered date is Valid "
      flag = 1
  }

  if(flag === 1){
    this.setState({
        assignmentDate: val,
        errorsDate: errors,
        isValidDate: true
    })
}else{
    this.setState({
        assignmentDate: val,
        isValidDate: false,
        errorsDate: errors
    })
  }
}

onChangesyllabus(event){
  this.setState({
      syllabus : event.target.value
  })
}

onChangeAssignmentTimings(event){
  this.setState({
      assignmentTimings : event.target.value
  })
}



onSubmit(event){
  event.preventDefault();
  const obj = {
      evaluationComponentId: this.state.assignmentId,
      assignmentTitle :this.state.assignmentTitle,
      deadlineDate : this.state.assignmentDate,
      deadlineTimings: this.state.assignmentTimings,
      description : this.state.assignmentDescription,
  }

    axios.post(`/teacher/postAnAssignment?teacherId=1&courseCode=${this.state.assignmentSubjectCode}`,obj)
    .then((response) => {
        console.log(response);
    })

      console.log(obj)
      alert("Posted")
      this.setState({
        assignmentTitle : "",
        assignmentDescription : "",
        assignmentDate : '',
        syllabus: '',
        assignmentTimings: ''
      })

      window.location.reload()
}

async handleClick(id){
  this.setState({
    assignmentSubjectCode: id,
    assignmentTitle : null,
    assignmentDescription : "",
    assignmentDate : '',
    syllabus: '',
    assignmentTimings: ''
  })


  try{
    const responseJson = await axios.get(`teacher/getEvaluationComponentsForDropDown?teacherId=1&courseCode=${id}&evaluationType=ASSIGNMENT`, {
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
        assignmentSubjectCode: id
      })
  }, 1000);

  }catch(error){
    console.log(error)
  }
}

async componentDidMount(){
  setInterval(() => this.setState({ time: Date.now()}), 1000)
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
      if(this.state.assignmentSubjectCode === null){
        return (
          <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                    {
                    this.state.resp.data.map((item) => {
                      return(
                        <ProfileHeaderCard 
                        subjectCode = {this.state.assignmentSubjectCode}
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
                        subjectCode = {this.state.assignmentSubjectCode}
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}/>
                      )
                    })
                  }
            </div>
            

            <div className = "InnerContainer__Data__AdminAssignmentPost">
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <div style = {{marginRight: "15px", width: "400px"}}>
                            <label>Title :</label>
                            <Select options = {this.state.resList}
                              onChange = {this.onChangeAssignmentTitle}
                              
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                      <div className = "form-check form-check-inline">
                        <div style = {{marginRight: "15px"}}>
                          <label>DeadLine Date :</label>
                          <input type = "text" 
                              className = "form-control"
                              placeholder = "DD/MM/YYYY"
                              value = {this.state.assignmentDate}
                              onChange = {this.onChangeAssignmentDate}
                          />

                          <div className = {this.state.isValidDate ? 'InputFeedback' : 'InputFeedback_red'} >
                            {this.state.errorsDate}
                          </div>
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label>DeadLine Timings :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.assignmentTimings}
                              onChange = {this.onChangeAssignmentTimings}
                          />
                        </div>
                      </div>
                    </div>

                    <div className = "form-group">
                        <label>Description :</label>
                        <textarea
                            className = "form-control"
                            value = {this.state.assignmentDescription}
                            onChange = {this.onChangeAssignmentDescription}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" 
                            value = "Post" 
                            className = "btn btn-primary" 
                            style = {{width : "40%"}} 
                            disabled = {(this.state.isValidDate) ? false : true}
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
