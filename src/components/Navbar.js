import React from "react";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ApartmentIcon from '@material-ui/icons/Apartment';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import Tooltip from '@material-ui/core/Tooltip';
import WhatshotIcon from '@material-ui/icons/Whatshot';
const items = [
  { name: "home", label: "Home" },
  { name: "billing", label: "Billing" },
  { name: "settings", label: "Settings" },
]; 
 
function Navbar({section, sectionCb}) {
  return (
    <div style={{ flex: " 0 0 80px" }}>
      <div className="sidebar">
        <List disablePadding dense>

            <ListItem  button style={{padding: "1rem", background: section == "headlines"?"orange" : ""}} onClick={() => sectionCb("headlines") } >
                <ListItemIcon color="primary">
                    <Tooltip title="headlines"  placement="right-start" arrow>
                      <WhatshotIcon   color="primary" fontSize="large"/>
                    </Tooltip>
                </ListItemIcon>
            </ListItem>
             <ListItem  button   style={{padding: "1rem", background: section == "fitness"?"orange" : ""}}  onClick={() => sectionCb("fitness") } >
                <ListItemIcon color="primary">
                    <Tooltip title="fitness"  placement="right-start" arrow>
                      <FitnessCenterIcon   color="primary" fontSize="large"/>
                    </Tooltip>
                </ListItemIcon>
            </ListItem>
              <ListItem  button  style={{padding: "1rem", background: section == "business"?"orange" : ""}}  onClick={() => sectionCb("business") } >
                <ListItemIcon color="primary">
                  <Tooltip title="business"  placement="right-start" arrow>
                    <ApartmentIcon   color="primary" fontSize="large"/>
                  </Tooltip>
                </ListItemIcon>
            </ListItem>
             <ListItem  button  style={{padding: "1rem", background: section == "movies"?"orange" : ""}} onClick={() => sectionCb("movies") } >
                <ListItemIcon color="primary">
                  <Tooltip title="movies"  placement="right-start" arrow>
                    <LocalMoviesIcon   color="primary" fontSize="large"/>
                  </Tooltip>
                </ListItemIcon>
            </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Navbar;
