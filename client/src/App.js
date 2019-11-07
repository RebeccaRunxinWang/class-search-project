import React from 'react';
import './App.css';
import Background from "./image/background.jpg"


var result = 'select a.CourseName from dummy as a, (select max(teaching_quality) as tq from dummy) as b where a.teaching_quality = b.tq';

var question_style = {
  backgroundColor: 'red'
};

var container_style = {
  height: '100vh',
  backgroundColor: 'black'
};

var header_style = {
  backgroundColor: 'green'
}




class App extends React.Component{
    render(){
        return (
          <div class="container" style={container_style}>
            <div class= "header" style = {header_style}>
              <div class= "box-field">
                <img src={require("./image/background.jpg")}/>
              </div>
              <div class= "box-field">
                <h2>
                  Jun Yang Gang
                </h2>
              </div>
            </div>

            <div class="question" style={question_style}>
            <h3 style={{"color":"blue"}}>
            What do you care most?
            </h3>
            <Questions/>
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
        return <div>The class with beest teaching quality is {this.state.apiResponse} </div>
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

function highest_teaching_quality(){
      return (
        <p>
        The class with the highest teaching quality is {result}
        </p>
      );}

export default App;
