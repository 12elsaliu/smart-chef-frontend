import React from "react";
import "./LinkInput.css";
import Tilt from "react-tilt";

export const LinkInput = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
      <p className="b f3">
        SmartChef will recognise the food in your pics down to the ingredient
        level!
      </p>
      <div className="center">
        <input
          placeholder="Enter the link of the pic here (JPG/PNG is preferred)"
          onChange={onInputChange}
        />
        <Tilt className="Tilt br=4 br-100" options={{ max: 60 }}>
          <button onClick={onButtonClick}>Detect</button>
        </Tilt>
      </div>
    </div>
  );
};
