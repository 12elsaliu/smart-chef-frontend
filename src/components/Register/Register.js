
import React from 'react';

export class Register extends React.Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ //send
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(res => res.json())//receive
      .then((data) => {
        this.props.loadUser(data) //Put it in App.js states, in order to let all the other components can use the register data
      })

    this.props.onRouterChange('home')
  }

  render() {
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-2 center">
        <main className="pa4 black-80 ">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
              </div>
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
              <input className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 " type="submit" value="Register" onClick={this.onSubmit} />
            </div>
          </div>
        </main>
      </article>
    )
  }

}
