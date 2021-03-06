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


function ProfileHeaderCard({onClick, courseCode, courseName}){
  return (
    <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-2 my-3 d-flex justify-content-center">
        <Card style={{ width: '12rem', borderRadius: "25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
          onClick = {() => {onClick(courseCode)}}>
          <CardImg variant="top" style = {{height: "150px", borderRadius: "25px"}}
          src = "https://img.freepik.com/free-vector/realistic-golden-trophy-with-gold-laurel-wreath_48799-144.jpg?size=338&ext=jpg"/>
          <CardBody>
            <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>{courseCode}</CardTitle>
            <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>{courseName}</CardSubtitle>
          </CardBody>
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
      this.state = {
        resp: null,
        name: null
      }
  }

  handleClick(id){
    this.setState({
      name: id
    })
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
      return (
        <div className = " outer_container_background">
          <div className = "row" style = {{marginTop: "-20px"}}>
            <div className = "col-12  d-flex justify-content-center">
              <div>
                <Avatar alt = "AG" src = {Image} style = {{height: "150px", width: "150px", top: "40px"}} />
                <h3 style = {{marginTop: "40px", marginLeft: "-20px"}}>Anurag Goenka</h3>
              </div>
            </div>
          </div>

          <hr />

          <div className = "row" style = {{marginLeft: "0px", justifyContent: "center"}}> 
                  {
                  this.state.resp.data.map((item) => {
                    console.log(item)
                    return(
                      <ProfileHeaderCard 
                      onClick={this.handleClick}
                      courseCode = {item.courseCode}
                      courseName = {item.courseName}/>
                    )
                  })
                }
          </div>

          <hr />

          <div className = "row">
            <div className = "col-xsm-12 col-md-6 col-lg-6 my-3 d-flex justify-content-center">
              <Card className = "Card_style" style = {{borderRadius: "25px"}}>
                <CardBody className = "CardBody_style" style = {{borderRadius: "25px"}} >
                  <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>Personal Details</CardTitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Name -> {this.state.name}</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Age -> 21</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Blood Group -> O +ve</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Semester -> 8th</CardSubtitle>

                </CardBody>
              </Card>
            </div>

            <div className = "col-xsm-12 col-md-6 col-lg-6 my-3 d-flex justify-content-center">
            <Card className = "Card_style" style = {{borderRadius: "25px"}}>
                <CardBody className = "CardBody_style" style = {{borderRadius: "25px"}}>
                  <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>Achievements</CardTitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Code Battle -> 101</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>ACM Chapter -> 101</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Open House -> 2</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>PEC Buddy</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className = "row">
            <div className = "col-xsm-12 col-md-6 col-lg-6 my-3 d-flex justify-content-center">
              <Card className = "Card_style" style = {{borderRadius: "25px"}}>
                <CardBody className = "CardBody_style" style = {{borderRadius: "25px"}}>
                <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>Clubs Enrolled</CardTitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>IEEE</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>SCC</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>ACM</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>PDC</CardSubtitle>
                </CardBody>
              </Card>
            </div>

            <div className = "col-xsm-12 col-md-6 col-lg-6 my-3 d-flex justify-content-center">
            <Card className = "Card_style" style = {{borderRadius: "25px"}}>
                <CardBody className = "CardBody_style" style = {{borderRadius: "25px"}}>
                <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}> Hobbies </CardTitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Music</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Reading</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Gaming</CardSubtitle>
                  <CardSubtitle style = {{textAlign: "center", fontFamily: 'cursive', marginTop : "5px"}}>Badminton</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
}
