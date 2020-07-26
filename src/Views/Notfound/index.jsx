import React from 'react'
import notfound from '../../Images/notfound.png';
import Navbar from '../../Components/Navbar';

export const NotFound = () => {
  return (
    <div >
      <Navbar/>
      <div style={{textAlign: 'center', color: 'dimgrey'}}>
        <h3>404 Page Not Found</h3>
        <br />
        <img src={notfound} style={{padding: 5, maxHeight: 500, maxWidth: '100%', textAlign: 'center'}} alt="" />
        
      </div>
    </div>
  )
}
