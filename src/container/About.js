import React, { Component } from 'react';
import ContentsSquare from '../container/ContentsSquare.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class About extends Component {
  constructor(props) {
    super(props);
  }
  setFooterOpacity(opacity) {
    document.getElementsByTagName("footer")[0].style.opacity = opacity;
  }
  initAbout() {
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    var aboutTag = document.getElementById("about");
    var about = firebaseDb.ref("about/" + language);
    var self = this;
    about.on('value', function(snapshot) {
      const val = snapshot.val();
      if (aboutTag && val) {
        var squareTag = document.createElement("section");
        squareTag.id = "contents-square";
        aboutTag.innerHTML = "";
        aboutTag.appendChild(squareTag);
        const square = React.createElement(ContentsSquare, {data : val.square});
        ReactDOM.render(square, squareTag);
        self.setFooterOpacity(1);
      }
    });
  }
  componentDidMount() {
    this.setFooterOpacity(0);
    this.initAbout();
  }
  render() {
    return ( <main id="about"></main> );
  }
}

export default About;