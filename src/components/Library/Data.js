import React, { Component } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import './Data.css'
import '../../custom_styles.css'
import axios from 'axios'
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";

function LibrayCard({id,bookId, author, title, description, edition, issueDate, dueDate}){
  var color;
  if(id === "due_date_not_passed"){
    color = "linear-gradient(lightgreen, green)"
  }else if(id === "due_date_passed"){
    color = "linear-gradient(#FF9999, red)"
  }else{
    color = "linear-gradient(lightblue, #4169E1)"
  }

  
  

  return (
    <div className = "col-xsm-12 col-sm-6 col-md-6 col-lg-3 my-3 d-flex justify-content-start">
        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}> 
          <Card style={{width: '18rem', borderRadius: "25px", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)", background: color}}>
            <CardBody>
              <CardTitle style = {{fontSize: "25px", fontWeight: "bold", fontFamily: "cursive"}}>{bookId} - {title}</CardTitle>
              <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive'}}>Authored By -> {author}</CardSubtitle>
              <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Edition -> {edition}</CardSubtitle>
              <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Issued From -> {issueDate}</CardSubtitle>
              <CardSubtitle style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>Issued Till -> {dueDate}</CardSubtitle>
              <CardText style = {{textAlign: "left", marginLeft: "10px", fontFamily: 'cursive', marginTop : "5px"}}>
                {description}
              </CardText>
            </CardBody>
          </Card>
        </Animated>         
    </div>
  )
}

function Row({title, count}){
  var heading
  var font_color
  var back_color
  if(title === "due_date_not_passed"){
      heading = "Issued Books"
      back_color = "lightgreen"
      font_color = "green"
  }else if(title === "due_date_passed"){
      heading = "Books OverDue"
      back_color = "#ff9999"
      font_color = "red"
  }else{
      heading = "Books Returned"
      back_color = "lightblue"
      font_color = "blue"
  }
  return(
    <div style = {{display : "inline-block"}}>
        <div style = {{float: "left", fontFamily: "cursive", fontSize: "35px", color: "brown", fontWeight: "bold", fontFamily: "cursive"}} >
            {heading}
          </div>
          
          <div style = {{float: "right", marginLeft: "25px"}} >
            <Animated animationIn="rollIn" animationOut="fadeOut" isVisible={true}>
              <Avatar alt = "%" style = {{height: "50px", width: "50px", top: "3px", fontWeight: "bold", color: font_color, backgroundColor: back_color}} >{count} </Avatar>
            </Animated>
          </div>
    </div>
  )
}

const setAsyncTimeout = (cb, timeout = 1000) => new Promise(resolve => {
  setTimeout(() => {
      cb();
      resolve();
  }, timeout);
});


export default class Data extends Component {
  constructor(props){
    super(props);

    var today = new Date();
    this.state = {
      resp : null,
    }
  }

  async componentDidMount(){
    try{
      const responseJson = await axios.get('/fetchBooks/17103034', {
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
    if(this.state.resp === null){
      return(
        <LoopCircleLoading color = "red"/>
      )
    }else{
      
      return(
        <div className = "outer_container_background">
       { Object.keys(this.state.resp.data.bookIssueMap).map((type) => {
         console.log(this.state.resp.data.bookIssueMap[type].length)
          return (
            <>
              <Row title = {type} count = {this.state.resp.data.bookIssueMap[type].length} />
              <div className = "row" style = {{justifyContent: "center"}}>
                {
                  JSON.stringify(this.state.resp.data[type]) !== '{}'? 
                  <div>
                    
                  </div> 
                  : 
                  <div style = {{height: "50px", fontSize: "25px", padding: "20px"}}>
                    Nothing to Show !
                  </div>
                }
                {
                  this.state.resp.data.bookIssueMap[type].map((data) => {
                  return(
                    <LibrayCard 
                        id = {type}
                        key = {data.bookId}
                        bookId = {data.bookId}
                        author = {data.author} 
                        title = {data.title}
                        description = {data.description}
                        edition = {data.edition}
                        issueDate = {data.issueDate}
                        dueDate = {data.dueDate}/>
                      )
                })
              }
              </div>
            </>
          )
          // console.log(type,this.state.res.data[type])
      })
    }
      </div>
      )
    }
  }
}




