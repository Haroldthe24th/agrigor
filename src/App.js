import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Main from "./components/Main";
import Landing from "./components/Landing";
import "./App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScrollButton from "./components/ScrollButton";
import Modal from "./components/Modal";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: [],
      section: "headlines",
      loading: true,
      modalClosed: true,
      navbarItems: [
        {
          id: 0,
          title: "science",
          label: "science",
          selected: false,
          inNavbar: false,
        },
        {
          id: 1,
          title: "healthAndFitness",
          label: "healthAndFitness",
          selected: false,
          inNavbar: false,
        },
        {
          id: 2,
          title: "world",
          label: "world",
          selected: false,
          inNavbar: false,
        },
        {
          id: 3,
          title: "politics",
          label: "politics",
          selected: false,
          inNavbar: false,
        },
         {
          id: 4,
          title: "business",
          label: "business",
          selected: false,
          inNavbar: false,
        },
        
         {
          id: 5,
          title: "tech",
          label: "tech",
          selected: false,
          inNavbar: false,
        },
         {
          id: 6,
          title: "sports",
          label: "sports",
          selected: false,
          inNavbar: false,
        }
      ],
    };
    this.sectionCb = this.sectionCb.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.modalCallback = this.modalCallback.bind(this);
    this.landingCallback = this.landingCallback.bind(this);
  }
  async componentDidMount() {
    /* const url = "http://localhost:3000/resources/getResources/sports";
    let req = new Request(url);
    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/resources/getResources/sports")
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      */
    /*
      let req2 = new Request("http://localhost:3000/resources/getResources/sports");
      try {
    await fetch(req2).then((response) => {
      response.json().then((data) => {
       console.log("agri api", data)
      });
    });
    } catch(e){
        console.log(e)
      }*/
    //try to find saved user categories
    //saved localy in the browser
    const userCategories = localStorage.getItem("userCategories");
        if (userCategories != null) {

    const parsedUserCategories = JSON.parse(userCategories);
    console.log(parsedUserCategories)
    const userCatArray = [];
    parsedUserCategories.forEach((cat, index) => {
      if(cat.selected){
      userCatArray.push(cat.title)
      }    
    })
    console.log("userCatArray",userCatArray)
    fetch("http://localhost:3000/resources/getResources/mixed",{
      method: 'POST',
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
      body: 
        JSON.stringify({types: userCatArray})
      
      })
      .then((response) => response.json())
      .then((data) =>{
        let returnArray = data;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      })
      .catch((error) => console.log("error", error));
      this.setState({ navbarItems: parsedUserCategories });
    }
    console.log(userCategories);
  }
  async sectionCb(section) {
    this.setState({ section, loading: true });
    //
    const url =
      "http://localhost:3000/resources/getResources/" +
      section;
          console.log("url ",url)

    let req = new Request(url);
    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data;
        console.log("data",data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });
  }
  async searchCallback(query) {
    console.log("query", query);
    this.setState({ loading: true });

    const url =
      "https://newsapi.org/v2/everything?" +
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
  modalCallback() {
    const modalClosed = this.state.modalClosed;
    this.setState({ modalClosed: !modalClosed });
  }
  landingCallback(data) {
    this.setState({ navbarItems: data });
    //save the user prefs to the browser
    localStorage.setItem("userCategories", JSON.stringify(data));

    console.log("data", data);
  }
  render() {
    const {
      articleArray,
      section,
      loading,
      modalClosed,
      navbarItems,
    } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <Navbar
          navbarItems={navbarItems.filter(
            (item, index) => item.inNavbar == true
          )}
          section={section}
          sectionCb={this.sectionCb}
          modalCallback={this.modalCallback}
        />
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
        <Modal
          landingCallback={this.landingCallback}
          closed={modalClosed}
          modalCallback={this.modalCallback}
          navbarItems={navbarItems}
        ></Modal>
      </div>
    );
  }
}

export default App;
