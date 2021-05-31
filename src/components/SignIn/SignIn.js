
import React from 'react';

export class SignIn extends React.Component {

  state = {
    email: '',
    password: ''
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ //send
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())//receive
      .then((user) => {
        if (user.id) {
          console.log(user.id)
          this.props.loadUser(user)
          this.props.onRouterChange('home')
        } else {
          alert('The combination of username and password is incorrect. Please try again')
        }
      })

  }



  render() {
    const { onRouterChange } = this.props
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-2 center">
        <main className="pa4 black-80 ">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmit} />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db pointer" onClick={() => onRouterChange('Register')}>Register</a>
            </div>
          </div>
        </main>
      </article>
    )
  }

}
