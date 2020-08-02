import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom' 
import icon from '../../Images/logo.svg'
import M from 'materialize-css'
import { auth, SignOut } from '../../Firebase/auth';

const TopBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      if(user) setUser(user)
      else setUser(false);
    })
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  })
  return (
    <>
      <nav>
        <div className="nav-wrapper" style={{background: 'black'}}>
          <a href="#!" className="brand-logo">
            <img className="App-logo" src={icon} alt="" />
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <span style={{fontSize: 24, marginLeft: 90}} className="hide-on-med-and-down">ProStockAlert</span>
          <ul className="right hide-on-med-and-down">
            <li><Link to="chatRoom1">Chat Room 1</Link></li>
            <li><Link to="chatRoom2">Chat Room 2</Link></li>
            <li><Link to="chatRoom3">Chat Room 3</Link></li>
            {user === null ? 
              null: user ?
              <li onClick={() => SignOut()} style={{border: '2px solid white', borderRadius: 5, padding:'3px 10px', margin: 10, lineHeight:'30px'}} className="signBtn" >
                Sign Out  <i className="fa fa-sign-out" style={{height: 30, lineHeight: '30px'}}></i>
              </li>
              :
              <li onClick={() => window.location.replace('/sign-in')} style={{border: '2px solid white', borderRadius: 5, padding:'3px 10px', margin: 10, lineHeight:'30px'}} className="signBtn" >
                Sign In  <i className="fa fa-sign-in" style={{height: 30, lineHeight: '30px'}}></i>
              </li>
              }
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="chatRoom1">Chat Room 1</Link></li>
        <li><Link to="chatRoom2">Chat Room 2</Link></li>
        <li><Link to="chatRoom3">Chat Room 3</Link></li>
      </ul>
     </>
  );
};

export default TopBar;