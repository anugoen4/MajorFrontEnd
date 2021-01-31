import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'


export default class Data extends Component {
  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now()}), 1000)
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
    return (
      <div className = "outer_container_background">
        Hello, AdminPage Here
      </div>
    )
  }
}
