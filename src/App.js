import React from 'react'
import './App.css'
import { Navigation } from './components/Navigation/Navigation'
import { Logo } from './components/Logo/Logo'
import { LinkInput } from './components/LinkInput/LinkInput'
import { Rank } from './components/Rank/Rank'
import { FaceRecognition } from './components/FaceRecognition/FaceRecognition'
import { SignIn } from './components/SignIn/SignIn'
import { Register } from './components/Register/Register'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: "02e6e4d21e7e4a3a8aba1c68fe4b7591",
});

class App extends React.Component {

  state = {
    input: '',
    imgUrl: '',
    boundBox: '',
    router: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    }
  }

  //testing
  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then(res => res.json())
  //     .then(console.log)
  // }
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonClick = () => {
    //Use machine learning API here
    this.setState({
      imgUrl: this.state.input
    }, () => {
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        // THE JPG
        this.state.imgUrl
      )
        .then((response) => {

          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(user => {
              console.log(user)
              this.setState(Object.assign(this.state.user, { entries: user.entries }))
            })
          this.lockDisplayBox(response)
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }

  lockDisplayBox = (data) => {
    const faceBoxData = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = image.width
    const height = image.height
    const boundBox = {
      top: height * faceBoxData.top_row,
      bottom: height - height * faceBoxData.bottom_row,
      left: width * faceBoxData.left_col,
      right: width - width * faceBoxData.right_col
    }
    this.setState({ boundBox })
  }

  onRouterChange = (router) => {
    if (router === 'home') {
      this.setState({
        isSignedIn: true
      })
    } else {
      this.setState({
        isSignedIn: false
      })
    }
    this.setState({
      router
    })
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="cf">
          <Logo />
          <Navigation onRouterChange={this.onRouterChange} isSignedIn={this.state.isSignedIn} />
        </div>
        {
          this.state.router === 'home'
            ?
            <div>
              <LinkInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
              <Rank name={this.state.user.name} rank={this.state.user.entries} />
              <FaceRecognition box={this.state.boundBox} url={this.state.imgUrl} />
            </div>
            : (this.state.router === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouterChange={this.onRouterChange} />
              : <Register loadUser={this.loadUser} onRouterChange={this.onRouterChange} />
            )
        }
      </div>
    );
  }
}

export default App;
