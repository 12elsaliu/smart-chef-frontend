import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { LinkInput } from "./components/LinkInput/LinkInput";
import { Rank } from "./components/Rank/Rank";
import { FoodRecognition } from "./components/FoodRecognition/FoodRecognition";
import { SignIn } from "./components/SignIn/SignIn";
import { Register } from "./components/Register/Register";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "02e6e4d21e7e4a3a8aba1c68fe4b7591",
});

const initialState = {
  input: "",
  imgUrl: "",
  prediction: [],
  router: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  state = {
    input: "",
    imgUrl: "",
    prediction: [],
    router: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      entries: 0,
      joined: "",
    },
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onButtonClick = () => {
    this.setState(
      {
        imgUrl: this.state.input,
      },
      () => {
        app.models
          .predict(Clarifai.FOOD_MODEL, this.state.imgUrl)
          .then((response) => {
            fetch("https://salty-shelf-28856.herokuapp.com/image", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((res) => res.json())
              .then((user) => {
                this.setState(
                  Object.assign(this.state.user, { entries: user })
                );
              })
              .catch(console.log);
            this.displayIngredients(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  displayIngredients = (data) => {
    const prediction = data.outputs[0].data.concepts
      .filter((item) => {
        if (
          item.name === "vegetable" ||
          item.name === "meat" ||
          item.name === "pizza" ||
          item.name === "salad" ||
          item.name === "seafood"
        ) {
          return false;
        }
        return true;
      })
      .map((item) => {
        const value = Number(item.value).toPrecision(3);
        return `${item.name}    (possibilities: ${value})`;
      });
    this.setState({
      prediction,
    });
  };

  onRouterChange = (router) => {
    if (router === "home") {
      this.setState({
        isSignedIn: true,
      });
    } else {
      this.setState({
        isSignedIn: false,
      });
    }
    this.setState({
      router,
    });
  };

  cleanUrl = () => {
    this.setState(initialState);
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <div className="cf">
          <Logo />
          <Navigation
            onRouterChange={this.onRouterChange}
            isSignedIn={this.state.isSignedIn}
            cleanUrl={this.cleanUrl}
          />
        </div>
        {this.state.router === "home" ? (
          <div>
            <LinkInput
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <Rank name={this.state.user.name} rank={this.state.user.entries} />
            <FoodRecognition
              prediction={this.state.prediction}
              url={this.state.imgUrl}
            />
          </div>
        ) : this.state.router === "signin" ? (
          <SignIn
            loadUser={this.loadUser}
            onRouterChange={this.onRouterChange}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouterChange={this.onRouterChange}
          />
        )}
      </div>
    );
  }
}

export default App;
