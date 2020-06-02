import React, { useEffect, useState } from "react";
import Card from "./Card";
import ScrollButton from "./ScrollButton";
import SearchBar from "./SearchBar";

function Main({ articleArray, searchCallback }) {
  const [mainArticles, changeMainArticles] = useState([]);
  const [pagMod, changePagMod] = useState(24);
  const [scrollA, aChange] = useState(-2);
  const [scrollB, bChange] = useState(-1);
  useEffect(() => {
    window.addEventListener("scroll", onChangeScroll);
    const newArticleArray = [];
  /*  articleArray.forEach((art, index) => {
      if (pagMod > index) {
        newArticleArray.push(art);
      }
    });*/
    changeMainArticles(articleArray);
    return () => {
      window.removeEventListener("scroll", onChangeScroll);
    };
  }, []);
 /* useEffect(() => {
    if(pagMod > articleArray.length) return;
    if (scrollA >= scrollB) {
      const newArticleArray = [];

      articleArray.forEach((art, index) => {
        if (pagMod + 24 > index) {
          newArticleArray.push(art);
        }
      });
      changeMainArticles(newArticleArray);
      changePagMod(pagMod + 24);
      aChange(-2);
      bChange(-1);
    }
  }, [scrollB, scrollA]);*/
  const onChangeScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      aChange(window.innerHeight + window.scrollY);
      bChange(document.body.offsetHeight);
    }
    return;
  };

  console.log(mainArticles);
  console.log(pagMod);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "#2a2e35", //"#F0F0F0",
        paddingLeft: "4rem",
        paddingRight: "2rem",
      }}
    >
      <ScrollButton />
      <SearchBar searchCallback={searchCallback} />
      {articleArray.map((article, key) => {
        const {
          url,
          author,
          img,
          description,
          provider,
          title,

        } = article;
        return (
          <Card
            title={title}
            url={url}
            author={author}
            img={img}
            description={description}
            provider={provider}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default Main;
