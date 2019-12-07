import React from 'react';
import './App.css';
import Background from "./image/background.jpg"
import SearchIcon from "@material-ui/icons/Search";
import EnhancedTable from "./EnhancedTable"


var result = 'select a.CourseName from dummy as a, (select max(teaching_quality) as tq from dummy) as b where a.teaching_quality = b.tq';



class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }
  
    render(){
        return (
          <div class="container">
            <Header_bar/>
            <div class="main">
              <Search_bar/>
              <div class="question">
                  <h3 style={{"color":"blue"}}>
                  What do you care most?
                  </h3>
                  <Questions/>
              </div>
              <div class="wrapper">
                <div class="table">
                  <EnhancedTable data={this.state.apiResponse}/>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

class Questions extends React.Component {
    constructor(){
        super();
        this.state = {render:''}
    }

    handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});
    }

    _renderSubComp(){
        switch(this.state.render){
            case 'teaching_quality': return <Best_teaching_quality/>
            case 'Professor' : return <Best_professor/>
            case 'fun_level': return <Most_fun/>
        }
    }

    render() {
        return (
            <div className="App">
                <ul style={{display: 'inline'}}>
                    <li onClick={this.handleClick.bind(this, 'teaching_quality')}>Teaching quality</li>
                    <li onClick={this.handleClick.bind(this, 'Professor')}>Professor</li>
                    <li onClick={this.handleClick.bind(this, 'fun_level')}>Fun</li>
                </ul>
                {this._renderSubComp()}
            </div>
        );
    }
}

class Best_teaching_quality extends React.Component {

    render(){
        return <div>The class with beest teaching quality is </div>
    }
}

class Best_professor extends React.Component {
    render(){
        return <div>GOAT Prof</div>
    }
}

class Most_fun extends React.Component {
    render(){
        return <div>Most fun class</div>
    }
}

class Search_bar extends React.Component{
    render(){
      return (
        <div class="search_wrapper">
          <form id="formA" action="http://localhost:9000/testAPI" method="get">
          <div class="search">
            <input type="text" class="searchTerm" name="searchTerm" placeholder="What class are you interested in?"/>
            <button type="submit" class="searchButton">
              <SearchIcon/>
            </button>
           </div>
           </form>
       </div>
      );
    }
}

class Header_bar extends React.Component{
  render(){
    return (
      <div class="header_bar">
        <div class="box-field">
          <h3>
            <a href="./index.js">
              HOME
            </a>
          </h3>
        </div>
      </div>
    );
  }

}

function highest_teaching_quality(){
      return (
        <p>
        The class with the highest teaching quality is {result}
        </p>
      );}

export default App;
