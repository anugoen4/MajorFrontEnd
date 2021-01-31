import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import './Data.css'
import '../../../custom_styles.css'


class Data extends Component {
  constructor(props){
    super(props);  
}

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now()}), 1000)
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
    }
    return (
      <div className = "outer_container_background">
         Welcome to Student Convenience Portal - Divyanshi
        <hr />
        This will be landing page for news Feeds - Venky
        {/* {email} */}
        <hr />
        This will be landing page for Department Fee - Parul
        {/* {password} */}
        <hr />
        This will be landing page for Club Feed
        {/* {type} */}
      </div>
    )
  }
}

export default Data