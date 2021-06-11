import React from "react";
import "./foodRecognition.css";

export const FoodRecognition = ({ url, prediction }) => {
  const ingredients = prediction
    .filter((item) => {
      if (!item) {
        return false;
      }
    })
    .map((item) => {
      return (
        <li class="ph3 pv3 bb b--light-silver" key={item}>
          {item}
        </li>
      );
    });
  return (
    // <div>
    //   <div style={{ backgroundColor: "grey" }}>
    //     <div className="absolute mt2" style={{ backgroundColor: "grey" }}>
    //       <img alt="" src={url} width="500px" height="auto" id="inputimage" />
    //       {/* <div
    //         className="bounding-box"
    //         style={{
    //           top: box.top,
    //           right: box.right,
    //           left: box.left,
    //           bottom: box.bottom,
    //         }}
    //       ></div> */}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white-80 w-80 center br4">
      <div className="pl5-ns pt6-ns db black link dim w-50">
        <img width="500px" alt="" src={url} id="inputimage" />
      </div>

      <article class="pa5-ns w-50">
        <ul class="list pl0 ml0  mw6 ba b--light-silver br2 ">{ingredients}</ul>
      </article>
    </div>
  );
};
