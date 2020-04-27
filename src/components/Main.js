import React, {useEffect, useState} from "react";
import Card from "./Card";
import ScrollButton from "./ScrollButton"
import SearchBar from "./SearchBar"


function Main({articleArray, searchCallback}) {
  const [mainArticles, changeMainArticles] = useState([]);
  const [pagMod, changePagMod] = useState(25);
  const [scrollA, aChange] = useState(-2)
  const [scrollB, bChange] = useState(-1)
  useEffect(()=>{
    window.addEventListener("scroll", onChangeScroll)
    const newArticleArray = []; 
    articleArray.forEach((art, index )=> {
      if(pagMod >index ){
        newArticleArray.push(art)
      }
    })
    changeMainArticles(newArticleArray)
     return () => {
    window.removeEventListener('scroll', onChangeScroll)
  }
  },[])
    useEffect(()=>{
   console.log(pagMod,"zer")
   
    //reached bottom, load more stuff if there's any
        //keep count of pagenation modifier
        //base cards should be 25
        //pagMod * 25 if possible
        //work on  article Array
        console.log("scrollA",scrollA)
        console.log("scrollB",scrollB)
        if(scrollA >= scrollB){
         const newArticleArray = []; 
      
       articleArray.forEach((art, index )=> {
      if(pagMod + 25>index ){
        newArticleArray.push(art)
      }
    })
       changeMainArticles(newArticleArray)
       changePagMod(pagMod + 25)
       aChange(-2)
      bChange(-1)
          }
  },[scrollB,scrollA])
  const onChangeScroll = (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         aChange(window.innerHeight + window.scrollY)
         bChange(document.body.offsetHeight)
         

    }
    return;
      }
   
      console.log(mainArticles)
      console.log(pagMod)
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
          <SearchBar searchCallback={searchCallback}/>
        {mainArticles
          .map((article, key) => {
            const { url, author,urlToImage, description, publishedAt, title ,source} = article;
            return <Card source={source} title={title} url={url} author={author} urlToImage={urlToImage} description={description} publishedAt={publishedAt} key={key}/>;
          })}
      </div>
  );
}

export default Main;
