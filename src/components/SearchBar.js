import React, {useState} from "react";
import SearchIcon from '@material-ui/icons/Search';
function SearchBar() {
  const [holderTxt, changeHolderTxt] = useState("")
  console.log(holderTxt)
  return (

      <input  className="search-bar" type="text" placeholder={holderTxt} onFocus={()=> changeHolderTxt("search..")} onBlur={() =>  changeHolderTxt("")}/>

     

  );
}

export default SearchBar; 