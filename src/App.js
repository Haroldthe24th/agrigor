import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Main from "./components/Main";
import "./App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScrollButton from "./components/ScrollButton";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: [],
      section: "headlines",
      loading: true,
    };
    this.sectionCb = this.sectionCb.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
  }
  async componentDidMount() {
    const url =
      "http://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "pageSize=100" +
      "&apiKey=9635cc6b391a4665a96989771f2334cd";
    let req = new Request(url);
    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data.articles;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });
  }
  async sectionCb(section) {
    this.setState({ section, loading: true });
    const url =
      "http://newsapi.org/v2/everything?" +
      "q=" +
      section +
      "&pageSize=100" +
      "&sortBy=popularity" +
      "&apiKey=9635cc6b391a4665a96989771f2334cd";
    let req = new Request(url);
    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data.articles;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });
  }
  async searchCallback(query) {
    console.log("query", query);
    this.setState({ loading: true });

    const url =
      "http://newsapi.org/v2/everything?" +
      "q=" +
      query +
      "&pageSize=100" +
      "&sortBy=popularity" +
      "&apiKey=9635cc6b391a4665a96989771f2334cd";
    let req = new Request(url);

    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data.articles;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });
  }
  render() {
    const { articleArray, section, loading } = this.state;

    return (
      <div style={{ display: "flex", fontFamily: "Lato, sans-serif" }}>
        <Navbar section={section} sectionCb={this.sectionCb} />
        {!loading ? (
          <Main
            articleArray={articleArray}
            searchCallback={this.searchCallback}
          ></Main>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              background: "#2a2e35", //"#F0F0F0",
            }}
          >
            <CircularProgress style={{ color: "#fff" }} size={60} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
