import React from 'react'
import {Link} from 'react-router-dom'
import './AdminSideBar.css'

export default function AdminSideBarRow({link,selected, Icon,title}) {
  const url = '/' + link
  return (
    <>
    <Link to = {url} style = {{color: 'black', textDecoration : 'none'}}>
        <div className = {`AdminSideBarRow ${selected && 'selected'}`}>
          <Icon className = "AdminSideBarRow__icon"/>
          <h2 className = "AdminSideBarRow__title">{title}</h2>
        </div>
      </Link>
    </>
  )
}
