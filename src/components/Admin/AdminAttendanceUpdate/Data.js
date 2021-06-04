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
      attendanceSubjectCode: null,
      attendanceFileUpload: null,
      attendanceFileUploadName : "No File Chosen",
      attendanceDate : "",
      attendanceCount: null,   
      
      isValidDate: false,
      errorsDate: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeAttendanceFileUpload = this.onChangeAttendanceFileUpload.bind(this)
    this.onChangeAttendanceDate = this.onChangeAttendanceDate.bind(this)
    this.onChangeAttendanceCount = this.onChangeAttendanceCount.bind(this)
  
}


onChangeAttendanceFileUpload(event){
  event.preventDefault();
  this.setState({
    attendanceFileUpload: event.target.files[0],
    attendanceFileUploadName: event.target.files[0].name
  })

  
}

onChangeAttendanceDate(event){
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
        attendanceDate: val,
        errorsDate: errors,
        isValidDate: true
    })
}else{
    this.setState({
        attendanceDate: val,
        isValidDate: false,
        errorsDate: errors
    })
  }
}


onChangeAttendanceCount(event){
  this.setState({
      attendanceCount : event.target.value
  })
}



onSubmit(event){
  event.preventDefault();
  const obj = {
      attendanceDate : this.state.attendanceDate,
      attendanceCount: this.state.attendanceCount,
      attendanceFileUpload : this.state.attendanceFileUpload,
  }

  const formData = new FormData();
  formData.append(
    "file",
    this.state.attendanceFileUpload,
    this.state.attendanceFileUpload.name
  )

  console.log(this.state.attendanceFileUploadName)
  console.log(formData)

  // axios.post("api/uploadfile", formData);

    axios.post(`/teacher/uploadAttendance?courseCode=${this.state.attendanceSubjectCode}&attendanceDate=${obj.attendanceDate}&attendanceCount=${obj.attendanceCount}`,formData)
    .then((response) => {
        console.log(response);
    })

    alert("posted")
    this.setState({
      attendanceFileUpload: null,
      attendanceFileUploadName : "No File Chosen",
      attendanceDate : '',
      attendanceCount: 0
    })

    window.location.reload();

}

handleClick(id){
  this.setState({
    attendanceSubjectCode: id,
    attendanceFileUpload: null,
    attendanceFileUploadName : "No File Chosen",
    attendanceDate : '',
    attendanceCount: 0
  })
}

async componentDidMount(){
  setInterval(() => this.setState({ time:Date.now()}), 1000)
  try{
    const responseJson = await axios.get('/teacher/fetchSubjectForATeacher/1', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Count': 'application/json',
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
      if(this.state.attendanceSubjectCode === null){
        return (
          <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                    {
                    this.state.resp.data.map((item) => {
                      return(
                        <ProfileHeaderCard 
                        subjectCode = {this.state.attendanceSubjectCode}
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
                        subjectCode = {this.state.attendanceSubjectCode}
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}/>
                      )
                    })
                  }
            </div>
            

            <div className = "InnerContainer__Data__AdminAttendanceUpdate">
                <form onSubmit = {this.onSubmit}>
                    

                    <div className = "form-group">
                      <div className = "form-check form-check-inline">
                        <div style = {{marginRight: "15px"}}>
                          <label>Attendance Date :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.attendanceDate}
                              onChange = {this.onChangeAttendanceDate}
                              placeholder = "DD/MM/YYYY"
                          />

                          <div className = {this.state.isValidDate ? 'InputFeedback' : 'InputFeedback_red'} >
                            {this.state.errorsDate}
                          </div>
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label>Attendance Count :</label>
                            <input type = "text" 
                                className = "form-control"
                                value = {this.state.attendanceCount}
                                onChange = {this.onChangeAttendanceCount}
                                placeholder = "0"
                            />
                        </div>
                      </div>
                    </div>

                    <div className = "form-group">
                      <div className = "form-check form-check-inline">
                        <div style = {{marginRight: "50px"}}>
                          <label className = "file_upload"
                            for = "fileUpload"
                          >Choose a File: </label>
                            <input
                              id = "fileUpload"
                              type = 'file' 
                              className = "form-control"
                              onChange = {this.onChangeAttendanceFileUpload}
                              hidden
                            />
                        </div>

                        <div style = {{marginLeft: "-15px"}}>
                          {this.state.attendanceFileUploadName}
                        </div>
                      </div>
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
