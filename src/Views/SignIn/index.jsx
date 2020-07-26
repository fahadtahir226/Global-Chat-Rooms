import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { SignInCall } from '../../Firebase/auth';
import { googleLogin } from '../../Firebase/google';
import { facebookLogin } from '../../Firebase/facebook';
import Navbar from '../../Components/Navbar'

class SignIn extends Component {
  render() {
    return (
      <div className="container-fluid" >
        <Navbar />
        <div className="row" style={{marginTop: 50}} >
          <div className="col s12 offset-m2 m8 offset-l3 l6" >
            <form className="col s12" style={styleBox.form}>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}}>
                  <input id="login-email" type="email" className="validate" required={true} />
                  <label htmlFor="login-email">Email</label>
                  <span className="helper-text" data-error="Please Enter the correct Format of email !"></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}} >
                  <input id="login-pass" type="password" className="validate" required={true}/>
                  <label htmlFor="login-pass">Password</label>
                  <span className="helper-text" data-error="Password is required !"></span>
                </div>
              </div>
              <div className="row">
                <button className="btn waves-effect waves-light col s12 m12 l12" style={{padding: 0}} onClick={SignInCall} type="submit" name="action">SIGN IN
                  <i style={{margin: 0}} className="material-icons right">send</i>
                </button>
              </div>
              <div className='row' style={{marginTop: 45}} >
                <div className='col s2 m3 l3' style={{paddingRight: 0}}><div className="divider" style={{marginTop: 10}} ></div></div>
                <div className='col s8 m6 l6' style={{paddingLeft: 5, paddingRight: 5, color: 'dimgray'}} >OR LOGIN WITH YOUR SOCIAL MEDIA</div> 
                <div className='col s2 m3 l3' style={{paddingLeft: 0}} ><div className="divider" style={{marginTop: 10}} ></div></div>
              </div>
              <div class="row">              
                <div class="col s12 m6 l6" style={{marginTop: 10}}>
                  <button 
                    class="black white-text col s12 m12 l12 btn waves-effect waves-light" 
                    onClick={googleLogin} name="action">
                    Gmail
                    <i class="fa fa-google left"  style={{fontSize:24}}></i>
                    <i class="material-icons right">send</i>
                  </button>
                </div>

                <div class="col s12 m6 l6" style={{marginTop: 10}} >
                  <button 
                    class="blue darken-4 white-text col s12 m12 l12 btn waves-effect waves-light flow-text" 
                    onClick={facebookLogin} name="action"> 
                    Facebook
                    <i class="fa fa-facebook-square material-icons left"></i>
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
              <div className='row' >Don't have an account? <Link to='sign-up' >Sign Up</Link> here</div>

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
export default SignIn;