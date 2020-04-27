import React from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
function ScrollButton() {
  return (
    <div
      className="scroll-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ExpandLessIcon className="scroll-btn-icon" />
    </div>
  );
}

export default ScrollButton;
