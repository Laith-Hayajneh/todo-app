'use strict';
import React from 'react';
import './header.scss'
function Header (props){
    return(
        <header>
        <h1>To Do List: {props.incomplete} items pending</h1>
      </header>
    )
}
export default Header