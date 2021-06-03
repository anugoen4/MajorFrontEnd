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
      subjectCode: null,
      id: '',
      title : "",
      fileUpload: null,
      fileUploadName : "No File Chosen",
      totalMarks : 0,
      type: 'QUIZ',
      resList : []   
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeFileUpload = this.onChangeFileUpload.bind(this)
    this.onChangeTotalMarks = this.onChangeTotalMarks.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
  
}

onChangeTitle(event){
  this.setState({
    title : event.label,
    id: event.value
  })
}

onChangeFileUpload(event){
  event.preventDefault();
  this.setState({
    fileUpload: event.target.files[0],
    fileUploadName: event.target.files[0].name
  })

  
}

onChangeTotalMarks(event){
  this.setState({
      totalMarks : event.target.value
  })
}


onChangeType(event){
  this.setState({
      type : event.target.value
  })
}



onSubmit(event){
  event.preventDefault();
  const obj = {
      title :this.state.title,
      totalMarks : this.state.totalMarks,
      type: this.state.type,
      fileUpload : this.state.fileUpload,
  }

  const formData = new FormData();
  formData.append(
    "file",
    this.state.fileUpload,
    this.state.fileUpload.name
  )

  console.log(this.state.fileUploadName)
  console.log(formData)


    axios.post(`/teacher/uploadMarks?evaluationComponentId=${this.state.id}&courseCode=${this.state.subjectCode}&description=${obj.title}&evaluationType=${this.state.type}&maximumMarks=${obj.totalMarks}`,formData)
    .then((response) => {
        console.log(response);
    })

      console.log(obj)
      alert("Posted")
      this.setState({
        title : "",
        fileUpload: null,
        fileUploadName : "No File Chosen",
        totalMarks : 0,
        type: 'QUIZ',
        subjectCode: ''
      })

      window.location.reload()
}

async handleClick(id){
  this.setState({
    subjectCode: id,
    title : "",
    fileUpload: null,
    fileUploadName : "No File Chosen",
    totalMarks : 0,
    type: 'QUIZ'
  })

  try{
    const responseJson = await axios.get(`teacher/getEvaluationComponentsForMarksUploadDropDown?teacherId=1&courseCode=${id}`, {
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
        subjectCode: id
      })
  }, 1000);

  }catch(error){
    console.log(error)
  }

}

async componentDidMount(){
  setInterval(() => this.setState({ time:Date.now()}), 1000)
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
      if(this.state.subjectCode === null){
        return (
          <div className = "outer_container_background">
            <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                    {
                    this.state.resp.data.map((item) => {
                      return(
                        <ProfileHeaderCard 
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
                        subjectCode = {this.state.subjectCode}
                        onClick={this.handleClick}
                        courseCode = {item.courseCode}
                        courseName = {item.courseName}/>
                      )
                    })
                  }
            </div>
            

            <div className = "InnerContainer__Data__AdminMarksUpdate">
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <div style = {{marginRight: "15px", width: "400px"}}>
                            <label>Title :</label>
                            <Select options = {this.state.resList}
                              onChange = {this.onChangeTitle}
                              placeholder = "SELECT"
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                      <div className = "form-check form-check-inline">
                        <div style = {{marginRight: "15px"}}>
                          <label>Total Marks :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.totalMarks}
                              onChange = {this.onChangeTotalMarks}
                          />
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label>Type :</label>
                          <select
                            className = 'form-control'
                            value = {this.state.type}
                            onChange = {this.onChangeType}
                            style = {{width: "193px"}}
                          >
                            <option value={"QUIZ"}>Quiz</option>
                            <option value={"ASSIGNMENT"}>Assignment</option>
                          </select>
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
                              onChange = {this.onChangeFileUpload}
                              hidden
                            />
                        </div>

                        <div style = {{marginLeft: "-15px"}}>
                          {this.state.fileUploadName}
                        </div>
                      </div>
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
