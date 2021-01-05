import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'


class ForgotPassword extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_email: '',
            user_id: "",
            user_contact: "",
            user_password : "",
            user_confirm_password: "",
            login_type : "0",
            email_errors: 'Enter a valid email id',
            password_errors: '',
            confirm_password_errors: '',
            id_errors: 'Enter a valid id',
            contact_errors: 'Enter a valid contact',
            isValidEmail : false,
            isValidPassword : false,
            isValidUserContact : false,
            isValidUserID : false,
            isValidCredentials : false,
            isPasswordMatch: false
        }

        this.onResetPassword = this.onResetPassword.bind(this)
        this.onSubmitCredentials = this.onSubmitCredentials.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onChangeUserContact = this.onChangeUserContact.bind(this)
        this.onChangeUserID = this.onChangeUserID.bind(this)
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
                email_errors: errors,
                isValidEmail: false
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
            errors = "Enter a valid password"
        }else{
            errors = "Entered password is Valid"
            flag = 1
        }

        if(flag === 1 && val === this.state.user_confirm_password){
            this.setState({
                user_password: val,
                password_errors: errors,
                isValidPassword: true,
                isPasswordMatch: true,
                confirm_password_errors: "Passwords match",
                isValidConfirmPassword: true
            })
        }else if(flag === 1){
            this.setState({
                user_password: val,
                password_errors: errors,
                isValidPassword: true,
                isPasswordMatch : false,
                confirm_password_errors: "Passwords do not match",
                isValidConfirmPassword: false
            })
        }else{
            this.setState({
                user_password: val,
                password_errors: errors,
                isValidPassword: false,
                isPasswordMatch : false
            })
        }
    }

    onChangeConfirmPassword(event){
        let errors = '';
        let flag = 0;
        const val = event.target.value
        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if(!val){
            errors = "Please enter your password"
        }else if(val.length < 8){
            errors = "Password length must be greater than 8"
        }else if(val !== this.state.user_password){
            errors = "Passwords do not match"
        }else{
            errors = "Passwords match"
            flag = 1
        }

        if(flag === 1 && val === this.state.user_password){
            this.setState({
                user_confirm_password: val,
                confirm_password_errors: errors,
                isValidConfirmPassword: true,
                isPasswordMatch: true
            })
        }else{
            this.setState({
                user_confirm_password: val,
                confirm_password_errors: errors,
                isValidConfirmPassword: false,
                isPasswordMatch : false
            })
        }
    }

    onChangeUserContact(event){
        let errors = '';
        let flag = 0;
        const val = event.target.value
        const pattern = new RegExp("^[0-9]*$")
        if(!val){
            errors = "Please enter your contact"
        }else if(val.length !== 10 ){
            errors = "Not Valid"
        }else if(pattern.test(val)){
            errors = "Valid contact"
            flag = 1
        }else{
            errors = "Not Valid"
        }
        if(flag === 1){
            this.setState({
                user_contact: val,
                contact_errors: errors,
                isValidUserContact: true
            })
        }else{
            this.setState({
                user_contact: val,
                contact_errors: errors,
                isValidUserContact: false
            })
        }
    }

    onChangeUserID(event){
        let errors = '';
        let flag = 0;
        const val = event.target.value
        const pattern = new RegExp("^[0-9]*$")
        if(!val){
            errors = "Please enter your ID"
        }else if(val.length !== 8 ){
            errors = "Not Valid"
        }else if(pattern.test(val)){
            errors = "Valid ID"
            flag = 1
        }else{
            errors = "Not Valid"
        }

        if(flag === 1){
            this.setState({
                user_id: val,
                id_errors: errors,
                isValidUserID: true
            })
        }else{
            this.setState({
                user_id: val,
                id_errors: errors,
                isValidUserID: false
            })
        }
    }


    onSubmitCredentials(event){
        event.preventDefault();
        const obj = {
            email : this.state.user_email,
            password : this.state.user_password,
            type : this.state.login_type
        }

        if(this.state.login_type === '0'){
            alert("User")
            // localStorage.setItem("user_login", JSON.stringify({'data': obj}))
            console.log("Going for Login")
            this.setState({
                isValidCredentials : true
            })
            // this.props.history.push('/home')
        }else{
            alert("Admin")
        }
    }

    onResetPassword(event){
        event.preventDefault();
        alert("Reset Password")
        this.props.history.push('/')
    }


  render() {
    if(!this.state.isValidCredentials){
        return (
            <div className = "OuterContainer">
                <div className = "InnerContainer">
                    <form onSubmit = {this.onSubmitCredentials}>
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
                            <div className = "form-check form-check-inline">
                                <div style = {{marginRight: "15px"}}>
                                    <label>ID :</label>
                                    <input type = "text" 
                                        className = "form-control"
                                        value = {this.state.user_id}
                                        onChange = {this.onChangeUserID}
                                    />
                                    <div className = {this.state.isValidUserID ? 'InputFeedback' : 'InputFeedback_red'} >
                                        {this.state.id_errors}
                                    </div>
                                </div> 
    
                                <div style = {{marginRight : "-10px"}}>
                                    <label>Contact :</label>
                                    <input type = "text" 
                                        className = "form-control"
                                        value = {this.state.user_contact}
                                        onChange = {this.onChangeUserContact}
                                    />
                                    <div className = {this.state.isValidUserContact ? 'InputFeedback' : 'InputFeedback_red'} >
                                        {this.state.contact_errors}
                                    </div>
                                </div> 
    
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
                         </div>
    
                        <div className = "form-group">
                            <input type = "submit" 
                                value = "Reset Password" 
                                disabled = {(this.state.isValidEmail && this.state.isValidUserContact && this.state.isValidUserID) ? false : true}
                                className = "btn btn-primary" 
                                style = {{width : "40%"}} 
                            />
                        </div>             
                    </form>
                </div>
            </div>
                
        )
    }else{
        return(
            <div className = "OuterContainer">
                <div className = "InnerContainer">
                    <form onSubmit = {this.onResetPassword}>
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
    
                        <div className = "form-group">
                            <label>Confirm Password :</label>
                            <input type = "password" 
                                className = "form-control"
                                value = {this.state.user_confirm_password}
                                onChange = {this.onChangeConfirmPassword}
                            />
                            <div className = {this.state.isValidConfirmPassword ? 'InputFeedback' : 'InputFeedback_red'} >
                                {this.state.confirm_password_errors}
                            </div>
                        </div>   

                        <div className = "form-group">
                            <input type = "submit" 
                                value = "Reset Password" 
                                disabled = {this.state.isValidPassword && this.state.isValidConfirmPassword && this.state.isPasswordMatch ? false : true}
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

export default ForgotPassword
