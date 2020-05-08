import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ApartmentIcon from "@material-ui/icons/Apartment";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import Tooltip from "@material-ui/core/Tooltip";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AddIcon from '@material-ui/icons/Add';


function Navbar({ section, sectionCb,modalCallback, navbarItems }) {
  return (
    <div style={{ flex: " 0 0 80px" }}>
      <div className="sidebar">
        <List disablePadding dense>
         
          <ListItem
            button
            style={{
              padding: "1rem",
              background:
                section == "headlines"
                  ? "linear-gradient(90deg, rgba(255,142,65,1) 0%, rgba(255,116,23,1) 53%)"
                  : "",
            }}
            onClick={() => sectionCb("headlines")}
          >

            <ListItemIcon>
              <Tooltip title="headlines" placement="right-start" arrow>
                <WhatshotIcon
                  style={{
                    color:
                      section == "headlines" ? "#fff" : "rgb(96, 102, 113)",
                  }}
                  fontSize="large"
                />
              </Tooltip>
            </ListItemIcon>
          </ListItem>
         
           {navbarItems.map((item, index) => {
            return  <ListItem
            button
            style={{
              padding: "1rem",
              background: section == item.title ? "#ff7417" : "",
            }}
            onClick={() => sectionCb(item.title)}
          >
           {item.title}
          </ListItem>
          })}
            <ListItem
            button
            style={{
              padding: "1rem",
              background: section == "movies" ? "#ff7417" : "",
            }}
            onClick={() => modalCallback()}
          >
            <ListItemIcon>
              <Tooltip title="movies" placement="right-start" arrow>
              <AddIcon   style={{
                    color: section == "movies" ? "#fff" : "rgb(96, 102, 113)",
                  }}
                  fontSize="large"/>
              
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Navbar;
