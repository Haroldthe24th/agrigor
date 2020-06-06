import React from "react";
function LandingCard({cardCallback, id, selected, title}) {
  return (
<div className="landing-card" style={{background: selected ? "#e68443" :"", color: selected? "white" : ""}}onClick={ () => cardCallback(id)}>
<p>{title}</p>
</div>
  );
}

export default LandingCard;
