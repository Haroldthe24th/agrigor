import React from "react";
import Card from "./Card";
import ScrollButton from "./ScrollButton"
import SearchBar from "./SearchBar"


function Main({articleArray}) {
  return (
    <div 
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          background:  "#2a2e35",//"#F0F0F0",
          paddingLeft: "4rem", paddingRight: "2rem" 

        }}
      >
           <ScrollButton/>
<SearchBar/>
        {articleArray
          .map((article, key) => {
            const { url, author,urlToImage, description, publishedAt, title ,source} = article;
            return <Card source={source} title={title} url={url} author={author} urlToImage={urlToImage} description={description} publishedAt={publishedAt} key={key}/>;
          })}
      </div>
  );
}

export default Main;
