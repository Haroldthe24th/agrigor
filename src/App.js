import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Main from "./components/Main";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleArray: [],
      section: "headlines",
      loading: true
    };
    this.sectionCb = this.sectionCb.bind(this);
  }
  async componentDidMount(){
    const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
           "pageSize=100"+
          '&apiKey=9635cc6b391a4665a96989771f2334cd'; 
    let req = new Request(url);
    await fetch(req)
      .then(response => {
        response.json().then(data => {
              let returnArray = data.articles;
              console.log(data)
              this.setState({articleArray: returnArray, loading: false})

        })
       })

  }
  async sectionCb(section){
    this.setState({section, loading: true})
    const url = 'http://newsapi.org/v2/everything?' +
            "q="+ section +
           "&pageSize=100"+
           "&sortBy=relevancy"+
          '&apiKey=9635cc6b391a4665a96989771f2334cd'; 
          console.log("url",url)
    let req = new Request(url);
    await fetch(req)
      .then(response => {
        response.json().then(data => { 
              let returnArray = data.articles;
              console.log(data)
              this.setState({articleArray: returnArray, loading: false})

        })
      })
}
  render() {
    const { articleArray,
            section,loading} = this.state;
    console.log("section",section)
    console.log("loading", loading)
  return (
    <div style={{ display: "flex", fontFamily:  'Lato, sans-serif'

}}>
      <Navbar section={section} sectionCb={this.sectionCb}/>
      {!loading && 
     <Main articleArray={articleArray}/>
   }
    </div>
  );
}
}

export default App;
