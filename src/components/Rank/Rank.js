import React from "react";

export const Rank = ({ name, rank }) => {
  return (
    <div>
      <br></br>
      <div className="f5">{`Hi ${name}, you've detected ${rank} delicious dishes.`}</div>
      <br></br>
    </div>
  );
};
