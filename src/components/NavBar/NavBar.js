import React, {useState} from 'react'
import "./NavBar.css"
import Avatar from '@material-ui/core/Avatar';
import Image from '../../assets/anurag.jpg'
import Logo from '../../assets/pec.png'

function Test() {
    const email = JSON.parse(localStorage.getItem('user_login'))?.data.email || null;
    const type = JSON.parse(localStorage.getItem('user_login'))?.data.type || null;
    const SID = "Be17103034"
    
    console.log(email)
    console.log(type)
    return (
        
        <>
            <div className = "NavBar">
                <div className = "NavBar__left">
                    <img className = "NavBar__logo" 
                    src = {Logo} />
                </div>
            
                <div className = "NavBar__right">
                    <div className = "NavBar__right__content">
                        <span className = "NavBar__right__option__1"> Hi , {email} </span>
                        <span className = "NavBar__right__option__2"> SID --> {SID} </span>
                    </div>

                    <Avatar alt = "AG" src = {Image} style = {{height : "35px", width : "35px"}} />

                    {/* <div className = "NavBar__right__content">
                        <span className = "NavBar__right__option__1"> Returns </span>
                        <span className = "NavBar__right__option__2"> & Orders </span>
                    </div>

                    <div className = "NavBar__right__content">
                        <span className = "NavBar__right__option__1"> Try </span>
                        <span className = "NavBar__right__option__2"> Prime </span>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Test
