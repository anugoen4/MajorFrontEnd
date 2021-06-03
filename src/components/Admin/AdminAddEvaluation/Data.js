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
import {Modal} from 'react-bootstrap'

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


function EvaluationCard({id,type, title, date, weightage, onClick}){
  return (
    <div className = "my-3 d-flex justify-content-center">
        <Card style={{ width: "70vw", height: "6rem" , padding: "10px" ,borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
         <div style = {{display: "flex"}}>
           <div style = {{flex: "0.4", paddingLeft: "10px"}}>
              <div>
                 <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Type -- {type}</CardSubtitle>
              </div>
              <div>
                  <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>D -- {date}</CardSubtitle>
              </div>
           </div>
           <div style = {{flex: "0.4"}}>
              <div>
                <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Title -- {title}</CardSubtitle>
              </div>
              <div>
                <CardSubtitle style = {{fontSize: "16px", textAlign: "left", fontFamily: 'cursive', marginTop : "5px"}}>Weightage -- {weightage}</CardSubtitle>
              </div>
           </div>
           <div style = {{flex: "0.2"}}>
              <div>
                <Link style = {{fontSize: "16px", fontFamily:"cursive"}}
                onClick = {() => {onClick({id, type, title, date, weightage})}}>Edit</Link>
              </div>
           </div>
         </div>
        </Card>
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
    this.handleEditEvalCard = this.handleEditEvalCard.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeWeightage = this.onChangeWeightage.bind(this)
    this.state = {
      resp: null,
      subjectCode: null,
      modalOpen: false,
      card_title:'',
      card_type: '',
      card_date: '',
      Card_weightage: '',
      card_id: '',
      evalData : null
    }
}

onSubmit(event){
  event.preventDefault();
  const obj = {
    evaluationComponentId : this.state.card_id,
    evaluationTitle : this.state.card_title,
    evaluationType : this.state.card_type,
    evaluationDate: this.state.card_date,
    weightAge: this.state.card_weightage,
  }

  console.log(obj)
  this.setState({
    modalOpen: false
  })

  axios.post(`/teacher/addEvaluationComponent?teacherId=1&courseCode=${this.state.subjectCode}`,obj)
    .then((response) => {
        console.log(response);
    })
  
  window.location.reload()
}

onChangeTitle(event){
  this.setState({
      card_title : event.target.value
  })
}

onChangeType(event){
  this.setState({
      card_type : event.target.value
  })
}

onChangeDate(event){
  this.setState({
      card_date : event.target.value
  })
}

onChangeWeightage(event){
  this.setState({
      card_weightage : event.target.value
  })
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

handleEditEvalCard({id, type, title, date,weightage}){
  
  this.setState({
    card_id: id,
    card_type: type,
    card_title: title, 
    card_date: date,
    card_weightage: weightage,
    modalOpen: true
  })

  console.log(this.state.card_weightage)
}

handleAddEvalCard(){
  this.setState({
    card_id: -1,
    card_type: '',
    card_title: '', 
    card_date: '',
    card_weightage: '',
    modalOpen : true
  })
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
            
            <div>
              <Button style = {{backgroundColor: "green"}}
               onClick = {() => {this.handleAddEvalCard()}}>Add Evaluation Criteria</Button>
            </div>

            <Modal 
              show = {this.state.modalOpen}
            >
            <div style = {{paddingLeft: "35px", paddingTop: "20px", justifyContent: "center"}}>
                <form onSubmit = {this.onSubmit}>
                  <div className = "form-group">
                      <div style = {{marginRight: "15px", width: "400px"}}>
                          <label>Type :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.card_type}
                              onChange = {this.onChangeType}
                          />
                      </div>

                      <div style = {{marginRight: "15px", width: "400px"}}>
                          <label>Title :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.card_title}
                              onChange = {this.onChangeTitle}
                          />
                      </div>

                      <div style = {{marginRight: "15px", width: "400px"}}>
                          <label>Date :</label>
                          <input type = "text" 
                              className = "form-control"
                              placeholder = "DD/MM/YYYY"
                              value = {this.state.card_date}
                              onChange = {this.onChangeDate}
                          />
                      </div>

                      <div style = {{marginRight: "15px", width: "400px"}}>
                          <label>Weightage :</label>
                          <input type = "text" 
                              className = "form-control"
                              value = {this.state.card_weightage}
                              onChange = {this.onChangeWeightage}
                          />
                      </div>
                      <div className = "form-group">
                        <input type = "submit" 
                            value = "Submit" 
                            className = "btn btn-primary" 
                            style = {{marginTop: "10px"}}
                        />
                    </div>       
                  </div>
                  </form>
              </div>
             
                
            </Modal> 
            {
              this.state.evalData.data.map((item) => {
                return(
                  <EvaluationCard 
                    key = {item.evaluationComponentId}
                    type = {item.evaluationType}
                    id = {item.evaluationComponentId}
                    onClick={this.handleEditEvalCard}
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
