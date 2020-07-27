import React, { useEffect } from 'react';
import { Link } from 'react-router-dom' 
import icon from '../../Images/logo.svg'
import M from 'materialize-css'

const TopBar = () => {
  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  })
  return (
    <>
      <nav>
        <div className="nav-wrapper" style={{background: 'black'}}>
          <a href="#!" class="brand-logo">
            <img className="App-logo" src={icon} alt="" />
          </a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <span style={{fontSize: 24, marginLeft: 90}} className="hide-on-med-and-down"  >Dashboard</span>
          <ul class="right hide-on-med-and-down">
            <li><Link to="chatRoom1">Chat Room 1</Link></li>
            <li><Link to="chatRoom2">Chat Room 2</Link></li>
            <li><Link to="chatRoom3">Chat Room 3</Link></li>
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-demo">
        <li><Link to="chatRoom1">Chat Room 1</Link></li>
        <li><Link to="chatRoom2">Chat Room 2</Link></li>
        <li><Link to="chatRoom3">Chat Room 3</Link></li>
      </ul>
     </>
  );
};

export default TopBar;