 
import React from "react";
import Landing from "./Landing"
function Modal({closed, modalCallback, navbarItems,landingCallback}) {
  return (
<React.Fragment>
 <div className={closed ?"modal closed": "modal"}  id="modal">
        <div className="modal-guts">
        <Landing navbarItems={navbarItems} landingCallback={landingCallback}/>
        </div>

    </div>
    <div className={ closed ? "modal-overlay closed" : "modal-overlay"} id="modal-overlay" onClick={() => modalCallback()}>
    </div>
    </React.Fragment>
  );
}

export default Modal;

