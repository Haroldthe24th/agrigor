import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Main from "./components/Main";
import Landing from "./components/Landing";
import "./App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScrollButton from "./components/ScrollButton";
import Modal from "./components/Modal"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: [],
      section: "headlines",
      loading: true,
      modalClosed: true,
      navbarItems: [
  { id:0,title: "health", label: "health" , selected:false, inNavbar: false},
  { id: 1,title: "fitness", label: "fitness" , selected:false, inNavbar:true},
  { id: 2,title: "fashion", label: "fashion" , selected:false, inNavbar: false},
]
    };
    this.sectionCb = this.sectionCb.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.modalCallback = this.modalCallback.bind(this);
    this.landingCallback = this.landingCallback.bind(this);
  }
  async componentDidMount() {
    const url ="http://localhost:3000/resources/getResources/sports";
    let req = new Request(url);
    await fetch(req).then((response) => {
      response.json().then((data) => {
        let returnArray = data;
        console.log(data);
        this.setState({ articleArray: returnArray, loading: false });
      });
    });


    var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/resources/getResources/sports")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
  }
  async sectionCb(section) {
    this.setState({ section, loading: true });
    const url =
      "https://newsapi.org/v2/everything?" +
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
   modalCallback(){
    const modalClosed = this.state.modalClosed;
    this.setState({modalClosed: !modalClosed})
   }
   landingCallback(data){
    this.setState({navbarItems: data})
    console.log("data", data)
   }
  render() {
    const { articleArray, section, loading,modalClosed,navbarItems } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <Navbar navbarItems={navbarItems.filter((item, index) => item.inNavbar == true)} 
        section={section}
         sectionCb={this.sectionCb}
          modalCallback={this.modalCallback} />
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
          navbarItems={navbarItems}>
        </Modal>
      </div>
    );
  }
}

export default App;
