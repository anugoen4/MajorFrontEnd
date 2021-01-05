import React, { Component } from 'react'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import './Default.css'


export default class ErrorPage extends Component {
  backToSafety(){
    localStorage.clear("user_login")
    alert("Moving Back to Safety")
    this.props.history.push('/')
  }

  render() {
    return (
      <>
      <div className = "ErrorPage">
          <h1 className = "ErrorPage__header">
              404
          </h1>
          <h1 className = "ErrorPage__header__2">
            Error
          </h1>
          <h2 className = "ErrorPage__header__message">
            Page not Found
          </h2>
            <h3 className = "ErrorPage__header__message__url">
              The requested Url 
              <br/>
              <span className = "text-danger">
                {this.props.location.pathname}
                </span>
                <br/>
              Was not Found
            </h3>

            <div className = "ErrorPage__button">
              <button onClick = {() => {this.backToSafety()}}>
                <ArrowBackIosRoundedIcon style = {{marginRight : "15px"}}/>
                    Back To Safety
              </button>
            </div>
      </div>
      </>
    )
  }
}
