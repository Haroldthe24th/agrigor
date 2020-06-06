import React, { useState, useEffect } from "react";
import LandingCard from "./LandingCard";
function Landing({ navbarItems, landingCallback }) {
  //filter navbar items here

  const [cardArray, changeCardArray] = useState(navbarItems);
  useEffect(() => {
    const newNavbarItem = [...navbarItems];
    newNavbarItem.forEach((item, index) => {
      if (item.inNavbar == true) {
        newNavbarItem[index] = { ...item, selected: true };
      }
    });
    changeCardArray(newNavbarItem);
  }, [navbarItems]);
  const cardCallback = (id) => {
    const newCardArray = [...cardArray];
   
    cardArray.forEach((arr, index) => {
      if (id === arr.id) {
        newCardArray[index] = { ...arr, selected: !arr.selected };
        changeCardArray(newCardArray);
      }
    });
    return;
  };

  const returnNavbarItems = () => {
    //if selected put in navbar true
    //if not selected set it to false
    //use callback to return clean data to be stored in parent component
    const newCardArray = [...cardArray];
    newCardArray.forEach((item, index) => {
      if (item.selected && !item.inNavbar) {
        newCardArray[index] = { ...item, inNavbar: true };
      }
      if (!item.selected && item.inNavbar) {
        newCardArray[index] = { ...item, inNavbar: false };
      }
    });
    landingCallback(newCardArray);
  };
  return (
    <div className="landing-card-section">
      <div className="landing-card-holder">
        {cardArray.map((arr, index) => {
          return (
            <LandingCard
              cardCallback={cardCallback}
              id={arr.id}
              selected={arr.selected}
			  title={arr.label}
			  key={index}
            />
          );
        })}
      </div>
      <div className="save-btn-holder">
      <div
	  className="save-btn"
        onClick={() => returnNavbarItems()}
      >
        save
		<hr />

      </div>
      </div>
    </div>
  );
}

export default Landing;
