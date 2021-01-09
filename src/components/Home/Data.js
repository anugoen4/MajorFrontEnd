import React, { Component } from 'react'
import './Data.css'
import '../../custom_styles.css'


export default class Data extends Component {
  render() {
    const email = JSON.parse(localStorage.getItem('user_login'))?.data.email;
    const password = JSON.parse(localStorage.getItem('user_login'))?.data.password;
    const type = JSON.parse(localStorage.getItem('user_login'))?.data.type;

    return (
      <div className = "outer_container_background">
         Welcome to Student Convenience Portal - Divyanshi
        <hr />
        This will be landing page for news Feeds
        {/* {email} */}
        <hr />
        This will be landing page for Department Fee
        {/* {password} */}
        <hr />
        This will be landing page for Club Feed
        {/* {type} */}
      </div>
    )
  }
}
