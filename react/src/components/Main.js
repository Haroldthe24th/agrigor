import React, { useEffect, useState } from "react";
import Card from "./Card";
import ScrollButton from "./ScrollButton";
import SearchBar from "./SearchBar";

function Main({ articleArray, searchCallback, userHasFeed }) {
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

  return (
    <div
      className="main-content"
    >
      <ScrollButton />
      {/*  <SearchBar searchCallback={searchCallback} />*/}
      {!userHasFeed && (
        <div className="page-error-msg">
          <h1> add categories to get a feed </h1>
        </div>
      )}
      {userHasFeed && articleArray != undefined && articleArray.length == 0 && (
        <div className="page-error-msg">
          <h1> couldn't find any articles :(</h1>
        </div>
      )}
      {articleArray.map((article, key) => {
        const {
          url,
          author,
          img,
          description,
          provider,
          title,
          categories,
        } = article;
        return (
          <Card
            title={title}
            url={url}
            author={author}
            img={img}
            description={description}
            provider={provider}
            categories={categories}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default Main;
