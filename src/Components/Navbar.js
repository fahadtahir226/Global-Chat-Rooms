import React, { useEffect } from 'react';
import icon from '../Images/logo.svg'
import M from 'materialize-css'

const Navbar = () => {
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
          <span style={{fontSize: 24, marginLeft: 90}} className="hide-on-med-and-down"  >ProStockAlert</span>
          <ul class="right hide-on-med-and-down">
            <li><a href="#!">Chat Room 1</a></li>
            <li><a href="#!">Chat Room 2</a></li>
            <li><a href="#!">Chat Room 3</a></li>
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-demo">
        <li><a href="#!">Chat Room 1</a></li>
        <li><a href="#!">Chat Room 2</a></li>
        <li><a href="#!">Chat Room 3</a></li>
      </ul>
     </>
  );
};

export default Navbar;