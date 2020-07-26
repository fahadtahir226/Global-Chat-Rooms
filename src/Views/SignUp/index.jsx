import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { SignUpCall } from '../../Firebase/auth';
import Navbar from '../../Components/Navbar'

class SignUp extends Component {
  render() {
    return (
      <div className="container-fluid" >
        <Navbar />
        <div className="row" style={{marginTop: 50}} >
          <div className="col s12 offset-m2 m8 offset-l3 l6" >
            <form className="col s12" style={styleBox.form}>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}}>
                  <input id="reg-username" type="text" className="validate" required={true} />
                  <label htmlFor="vusername">Full Name</label>
                  <span className="helper-text" data-error="Full Name is Required !"></span>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}}>
                  <input id="reg-email" type="email" className="validate" required={true} />
                  <label htmlFor="reg-email">Email</label>
                  <span className="helper-text" data-error="Please Enter the correct Format of email !"></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}} >
                  <input id="reg-pass" type="password" className="validate" required={true}/>
                  <label htmlFor="reg-pass">Password</label>
                  <span className="helper-text" data-error="Password is required !"></span>
                </div>
              </div>
              <div className="row">
                <button className="btn waves-effect waves-light col s12 m12 l12" style={{padding: 0}} onClick={SignUpCall} type="submit" name="action">SIGN IN
                  <i style={{margin: 0}} className="material-icons right">send</i>
                </button>
              </div>
              <div className='row' style={{marginTop: 40,  color: 'grey'}}>Already have an account? <Link to='sign-in' >Sign In</Link> here</div>
           </form>
          </div>
        </div>
      </div>
    );
  }
}
const styleBox = {
  form: {
    textAlign: 'center',
    marginTop: 10,
  }
}
export default SignUp;