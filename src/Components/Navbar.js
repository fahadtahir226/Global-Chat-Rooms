import React, { useEffect } from 'react';
import { Link } from 'react-router-dom' 
import icon from '../Images/logo.svg'
import M from 'materialize-css'
import { auth } from "../Firebase/auth";

const Navbar = () => {
  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    console.log(auth.currentUser)
  })
  return (
    <>
      <nav>
        <div className="nav-wrapper" style={{background: 'black'}}>
          <a href="#!" class="brand-logo">
            <img className="App-logo" src={icon} alt="" />
          </a>
           <span style={{fontSize: 24, marginLeft: 90}} className="hide-on-med-and-down"  >ProStockAlert</span>
           {/* <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><Link to="#!">Chat Room 1</Link></li>
            <li><Link to="#!">Chat Room 2</Link></li>
            <li><Link to="#!">Chat Room 3</Link></li>
          </ul> */}
        </div>
      </nav>
      {/* <ul class="sidenav" id="mobile-demo">
        <li><Link to="#!">Chat Room 1</Link></li>
        <li><Link to="#!">Chat Room 2</Link></li>
        <li><Link to="#!">Chat Room 3</Link></li>
      </ul> */}
     </>
  );
};

export default Navbar;