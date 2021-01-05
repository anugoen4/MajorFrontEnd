import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import { Redirect } from 'react-router-dom'


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_email : "",
            user_password : "",
            login_type : "0",
            email_errors: '',
            password_errors: '',
            isValidEmail : false,
            isValidPassword : false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeLoginType = this.onChangeLoginType.bind(this)
    }

    onChangeLoginType(event){
        this.setState({
            login_type : event.target.value
        })
    }

    onChangeEmail(event){
        let errors = '';
        let flag = 0
        const val = event.target.value
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        if(!val){
            errors = "Please enter your email"
        }else if(!pattern.test(val)){
            errors = "Please enter valid email address "
        }else{
            errors = "Entered email is Valid "
            flag = 1
        }
        
        if(flag === 1){
            this.setState({
                user_email: val,
                email_errors: errors,
                isValidEmail: true
            })
        }else{
            this.setState({
                user_email: val,
                email_errors: errors
            })
        }
        
    }

    onChangePassword(event){
        let errors = '';
        let flag = 0;
        const val = event.target.value
        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if(!val){
            errors = "Please enter your password"
        }else if(val.length < 8){
            errors = "Password length must be greater than 8"
        }else if(!pattern.test(val)){
            errors = "Must contain atleast one lower case, upper case , numeric and special character"
        }else{
            errors = "Entered password is Valid"
            flag = 1
        }

        if(flag === 1){
            this.setState({
                user_password: val,
                password_errors: errors,
                isValidPassword: true
            })
        }else{
            this.setState({
                user_password: val,
                password_errors: errors,
            })
        }
    }

    onSubmit(event){
        event.preventDefault();
        const obj = {
            email : this.state.user_email,
            password : this.state.user_password,
            type : this.state.login_type
        }

        if(this.state.login_type === '0'){
            alert("User")
            localStorage.setItem("user_login", JSON.stringify({'data': obj}))
            console.log("Going for Login")
            this.props.history.push('/home')
            // return <Redirect to="/home" />
        }else{
            alert("Admin")
        }
    }

  render() {
    return (
        <>
        <div className = "OuterContainer">
            <div className = "InnerContainer">
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Email :</label>
                        <input type = "text" 
                            className = "form-control"
                            value = {this.state.user_email}
                            onChange = {this.onChangeEmail}
                        />
                        <div className = {this.state.isValidEmail ? 'InputFeedback' : 'InputFeedback_red'} >
                            {this.state.email_errors}
                        </div>
                    </div>

                    <div className = "form-group">
                        <label>Password :</label>
                        <input type = "password" 
                            className = "form-control"
                            value = {this.state.user_password}
                            onChange = {this.onChangePassword}
                        />
                       <div className = {this.state.isValidPassword ? 'InputFeedback' : 'InputFeedback_red'} >
                            {this.state.password_errors}
                        </div>
                    </div>

                    <div className = 'form-group'>
                        <div className = "form-check form-check-inline">
                            <input className = "form-check-input"
                                type = "radio"
                                name = "UserType"
                                id = "user_login"
                                value = "0"
                                checked = {this.state.login_type === '0'}
                                onChange = {this.onChangeLoginType}
                            />

                            <label className = "form-check-label">User</label>
                        </div>


                        <div className = "form-check form-check-inline">
                            <input className = "form-check-input"
                                type = "radio"
                                name = "UserType"
                                id = "admin_login"
                                value = "1"
                                checked = {this.state.login_type === '1'}
                                onChange = {this.onChangeLoginType}
                            />

                            <label className = "form-check-label">Admin</label>
                        </div>

                        <div className = "form-check form-check-inline" style = {{float : 'right', marginRight: "0px"}}>
                            <Link to = '/forgotpassword'>                                
                                <label className = "form-check-label">Forgot Your Password</label>
                            </Link>
                        </div>
                     </div>

                    
                    <div className = "form-group">
                        <input type = "submit" 
                            value = "Login" 
                            disabled = {(this.state.isValidEmail && this.state.isValidPassword) ? false : true}
                            className = "btn btn-primary" 
                            style = {{width : "40%"}} 
                        />
                    </div>             
                </form>
            </div>
        </div>
        </>
            
    )
  }
}

export default Login
