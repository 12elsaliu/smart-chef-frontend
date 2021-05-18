import React from 'react'
import './App.css'
import { Navigation } from './components/Navigation/Navigation'
import { Logo } from './components/Logo/Logo'
import { LinkInput } from './components/LinkInput/LinkInput'
import { Rank } from './components/Rank/Rank'
import { FaceRecognition } from './components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: "02e6e4d21e7e4a3a8aba1c68fe4b7591",
});

class App extends React.Component {

  state = {
    input: '',
    imgUrl: '',
    boundBox: ''
  }

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


  render() {
    return (
      <div className="App">
        <Logo />
        <Navigation />
        <LinkInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
        <Rank />
        <FaceRecognition box={this.state.boundBox} url={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
