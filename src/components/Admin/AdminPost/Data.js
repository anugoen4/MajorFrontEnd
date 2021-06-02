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
      type : "",
      instructions : "",
      date : '',
      syllabus: '',
      timings: '',
      
      
      list :[
          {
              value: 1,
              label: 'Item 1'
          },
          {
            value: 2,
            label: 'Item 2'
          },
          {
            value: 3,
            label: 'Item 3'
        },
        {
          value: 4,
          label: 'Item 4'
        }
      ]
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeInstructions = this.onChangeInstructions.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeSyllabus = this.onChangeSyllabus.bind(this)
    this.onChangeTimings = this.onChangeTimings.bind(this)
  
}

onChangeType(event){
  console.log(event)
  this.setState({
      type : event.label
  })
}

onChangeInstructions(event){
  this.setState({
      instructions : event.target.value
  })
}

onChangeDate(event){
  this.setState({
      date : event.target.value
  })
}

onChangeSyllabus(event){
  this.setState({
      syllabus : event.target.value
  })
}

onChangeTimings(event){
  this.setState({
      timings : event.target.value
  })
}



onSubmit(event){
  event.preventDefault();
  const obj = {
      Type :this.state.type,
      Date : this.state.date,
      Timings: this.state.timings,
      syllabus: this.state.syllabus,
      Instructions : this.state.instructions,
      subjectCode : this.state.subjectCode
  }

  console.log(obj)

    // axios.post(`/teacher/postA?teacherId=1&courseCode=${this.state.SubjectCode}`,obj)
    // .then((response) => {
    //     console.log(response);
    // })

    alert("Posted")
    this.setState({
      type : "",
      instructions : "",
      date : '',
      syllabus: '',
      timings: ''
    })
}

handleClick(id){
  this.setState({
    subjectCode: id,
    type : null,
    instructions : "",
    date : '',
    syllabus: '',
    timings: ''
  })

  // try{
  //   const responseJson = await axios.get('/teacher/fetchSubjectForATeacher/1', {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',
  //     }
  //   })

  //    await setAsyncTimeout(() => {
  //     this.setState({
  //       list: JSON.parse(JSON.stringify(responseJson.data))
  //       // resp: this.state.res
  //      })
  // }, 1000);

  // }catch(error){
  //   console.log(error)
  // }

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
            

            <div className = "InnerContainer__Data__AdminPost ">
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <div style = {{marginRight: "15px", width: "400px"}}>
                            <label>Type :</label>
                            <Select options = {this.state.list}
                              onChange = {this.onChangeType}
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
                              value = {this.state.date}
                              onChange = {this.onChangeDate}
                          />
                        </div>

                        <div style = {{marginRight: "-10px"}}>
                        <label>Timings :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.timings}
                              onChange = {this.onChangeTimings}
                          />
                        </div>
                      </div>
                    </div>

                    <div className = "form-group">
                        <label>Instructions :</label>
                        <textarea
                            className = "form-control"
                            value = {this.state.instructions}
                            onChange = {this.onChangeInstructions}
                        />
                    </div>

                    <div className = 'form-group'>
                        <label>Syllabus :</label>
                        <textarea
                            className = "form-control"
                            value = {this.state.syllabus}
                            onChange = {this.onChangeSyllabus}
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
