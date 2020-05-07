import React, { useState} from "react";
import LandingCard from "./LandingCard"
function Landing() {
	const array = [{id: 1, title: "health", selected: false},
	{id: 2, title: "health", selected: false},
	{id: 3, title: "fitness", selected: false},
	{id: 4, title: "politics", selected: false},
	{id: 5, title: "football", selected: false},
	{id: 6, title: "fashio", selected: false},
	{id: 7, title: "health", selected: false},
	{id: 8, title: "health", selected: false},
	{id: 9, title: "health", selected: false},
	{id: 10, title: "health", selected: false},
	{id: 11, title: "health", selected: false},
	{id: 12, title: "health", selected: false},
	{id: 13, title: "health", selected: false},
	{id: 14, title: "health", selected: false},
	{id: 15, title: "health", selected: false}]
	const [cardArray, changeCardArray] = useState(array);
	const cardCallback = (id) =>{
		const newCardArray = [...cardArray]
		cardArray.forEach((arr, index ) => {
			if(id === arr.id){
				newCardArray[index] = {...arr, selected: !arr.selected}
				changeCardArray(newCardArray)
			}
		})
		return;
	}
  return (

<div className="landing-card-section">
<div  className="landing-card-holder">
{cardArray.map((arr, index) => {
return <LandingCard cardCallback={cardCallback} id={arr.id} selected={arr.selected} title={arr.title}/>
})}
</div>
</div>
  );
}

export default Landing;
