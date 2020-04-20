import React from "react";

function Card({url, urlToImage, title, bold, description, source}) {
  return (
    <div className="card"
     onClick={() =>{
      window.open(url, "_blank");
      console.log()
      }}>

      <img
        src={urlToImage} 
        alt="Avatar"
        className="card-image"
              ></img>
      <div className="card-container">
      <div className="card-source" onClick={() =>{
      window.open(url, "_blank");
      console.log()
      }}>{source.name}</div>
          <div className="card-title">{title}</div>
        {/*<div className="card-content">{description}</div>*/}
      </div>
    </div>
  );
}

export default Card;
