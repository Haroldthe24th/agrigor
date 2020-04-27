import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
function SearchBar({ searchCallback }) {
  const [holderTxt, changeHolderTxt] = useState("");
  const [txt, changeTxt] = useState("");

  const onSearchSub = (e) => {
    e.preventDefault();
    //call searchCallback with query
    searchCallback(txt);
  };

  const onTxtChange = (e) => {
    changeTxt(e.target.value);
  };
  return (
    <form onSubmit={(e) => onSearchSub(e)}>
      <input
        className="search-bar"
        type="search"
        onChange={onTxtChange}
        placeholder={holderTxt}
        onFocus={() => changeHolderTxt("search..")}
        onBlur={() => changeHolderTxt("")}
      />
    </form>
  );
}

export default SearchBar;
