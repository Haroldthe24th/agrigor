import React, { useEffect, useState, createRef } from "react";
import placeholder from "../placeholder.jpg";
import { Waypoint } from "react-waypoint";

function Card({ url, img, title, description, provider, categories }) {
  if (provider === "sportsnet" && img != undefined) {
    img = img.url;
  }
  const [uri, changeUri] = useState("");
  const [visible, changeVis] = useState(false);
  const [loaded, changeLoaded] = useState(false);
  const imgRef = React.createRef();

  useEffect(() => {
    changeUri(placeholder);
  }, []);
  const onImgFail = () => {
    changeUri(placeholder);
  };
  /*const  loadImage = async (imageUrl,imgRef) => {
    let img
    const imageLoadPromise = new Promise(resolve => {
        img = new Image();
        img.onload = resolve;
        img.src = imageUrl;
    });

    await imageLoadPromise;
    console.log("image loaded");
    return img;
}*/
  const onVisChange = () => {
    changeVis(true);
    changeUri(img);

    /* loadImage(urlToImage,).then(image => {
      console.log("images",images)

})*/
  };

  return (
    <Waypoint
      onEnter={onVisChange}
      topOffset={"1%"}
      // onLeave={this._handleWaypointLeave}
    >
      <div
        className={visible ? "card card-animate" : "card"}
        onClick={() => {
          window.open(url, "_blank");
        }}
      >
        <img
          onLoad={() => visible && changeLoaded(true)}
          ref={imgRef}
          onError={onImgFail}
          src={uri}
          className={"card-image"}
        ></img>
        <div className="card-container">
          <div
            className="card-source"
            onClick={() => {
              window.open(url, "_blank");
            }}
          >
            {provider}
          </div>
          <div className="card-title">{title} </div>
          {/*<div className="card-content">{description}</div>*/}
        </div>
        <div className="card-categories">
          {categories != undefined &&
            categories.length != 0 &&
            categories.length < 5 &&
            Array.isArray(categories) &&
            categories.map((cat) => {
              return <span className="card-category">{cat}</span>;
            })}
        </div>
      </div>
    </Waypoint>
  );
}

export default Card;
