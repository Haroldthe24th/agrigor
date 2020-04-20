import React, {useEffect, useState} from "react";
import placeholder from "../placeholder.jpg"
import { Waypoint } from 'react-waypoint';

function Card({url, urlToImage, title, bold, description, source}) {
    const [uri, changeUri] = useState("")
    const [visible, changeVis] = useState(false)
      useEffect(() =>{
          changeUri(urlToImage)
          console.log("here ")
      },[])
  const onImgFail = () =>{
      changeUri(placeholder)
  }
    const onVisChange = () => {
      changeVis(true)
                console.log("alos here ")

    } 
   
  return (
 
    <div         className={visible? "card-animate card":"card card-animate " }

     onClick={() =>{
      window.open(url, "_blank");
      }}>
 
      <img
        onError={onImgFail}
        src={visible?urlToImage:placeholder}
        className={"card-image" }
              ></img>
      <div className="card-container">
      <div className="card-source" onClick={() =>{
      window.open(url, "_blank");
      }}>{source.name}</div>
          <div className="card-title">{title} </div>
        {/*<div className="card-content">{description}</div>*/}
      </div>
    </div>   
     

  );
}

export default Card;
