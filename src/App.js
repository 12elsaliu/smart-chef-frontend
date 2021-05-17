import React from 'react'
import './App.css'
import { Navigation } from './components/Navigation/Navigation'
import { Logo } from './components/Logo/Logo'
import { LinkInput } from './components/LinkInput/LinkInput'
import { Rank } from './components/Rank/Rank'
import { FaceRecoginition } from './components/FaceRecoginition/FaceRecoginition'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: "02e6e4d21e7e4a3a8aba1c68fe4b7591",
});

class App extends React.Component {
  constructor() {
    super()
  }

  state = {
    input: ''
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonClick() {
    //Use machine learning API here
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      // THE JPG
      "https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=webp"
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  render() {
    return (
      <div className="App">
        <Logo />
        <Navigation />
        <LinkInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
        <Rank />
        <FaceRecoginition pic="https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=web" />
      </div>
    );
  }
}

export default App;
