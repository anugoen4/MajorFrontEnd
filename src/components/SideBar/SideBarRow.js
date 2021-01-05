import React from 'react'
import {Link} from 'react-router-dom'
import './SideBar.css'

export default function SideBarRow({link,selected, Icon,title}) {
  const url = '/' + link
  return (
    <>
    <Link to = {url} style = {{color: 'black', textDecoration : 'none'}}>
        <div className = {`SideBarRow ${selected && 'selected'}`}>
          <Icon className = "SideBarRow__icon"/>
          <h2 className = "SideBarRow__title">{title}</h2>
        </div>
      </Link>
    </>
  )
}
