import React, {Component} from 'react';




class Register extends Component{
  state={
    email:'',
    password:'',
    name:'',

  };

  onNameChange=(event)=>{
    this.setState({name:event.target.value})
  }

  onEmailChange=(event)=>{
    this.setState({email:event.target.value})
  }

  onPasswordChange=(event)=>{
    this.setState({password:event.target.value})
  }
  onSubmitSignIn =()=>{
    fetch('http://localhost:3001/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        name:this.state.name
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if(user){
        this.props.loadUser(user)
        this.props.onRouteChange('home')

      }
    })
  }

  render(){
return(
  <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
  <main className="pa4 black-80">
  <form className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f3 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="first-name">First Name</label>
        <input
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
           type="email"
            name="email-address"
              id="email-address"
                onChange={this.onNameChange}
             />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
           type="email"
            name="email-address"
             id="email-address"
              onChange={this.onEmailChange}
            />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input
          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
           type="password"
            name="password"
             id="password"
              onChange={this.onPasswordChange}
           />
      </div>

    </fieldset>
    <div className="">
      <input
        onClick={this.onSubmitSignIn}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value="Register" />
    </div>
    <div className="lh-copy mt3">
      <p onClick={()=>this.props.onRouteChange('signin')} className="f6 link dim black db pointer" >Already have an account? SignIn</p>

    </div>
  </form>
</main>
</article>
)
}
}
export default Register;
