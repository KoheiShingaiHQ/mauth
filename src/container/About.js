import React, { Component } from 'react';
import { hideMenu, setFooterOpacity, getCurrentPath, setScrollStatus } from '../container/Util.js';
import ContentsSquare from '../container/ContentsSquare.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

const path = { list : "/", featured : "/featured", detail : "/article" };

class About extends Component {
  constructor(props) {
    super(props);
  }
  getObjectName(currentPath) {
    for (var i in path) {
      if (currentPath === path[i]) {
        return i;
      }
    }
  }
  initAbout() {
    var language = 'en';
    var aboutTag = document.getElementById("about");
    var about = firebaseDb.ref(this.getObjectName(getCurrentPath()) + "/" + language);
    var self = this;
    about.on('value', function(snapshot) {
      const val = snapshot.val();
      if (aboutTag && val) {
        var squareTag = document.createElement("section");
        squareTag.id = "contents-square";
        squareTag.classList.add(language);
        aboutTag.innerHTML = "";
        aboutTag.appendChild(squareTag);
        const square = React.createElement(ContentsSquare, {data : val.square});
        ReactDOM.render(square, squareTag);
        setFooterOpacity(1);
        setScrollStatus();
      }
    });
    window.addEventListener("hashchange", function(){
      setFooterOpacity(1);
      setScrollStatus();
    }, false);
  }
  componentDidMount() {
    hideMenu();
    setFooterOpacity(0);
    this.initAbout();
    var self = this;
    window.addEventListener('resize', function (event) {
      setScrollStatus();
    });
  }
  render() {
    return ( <main id="about"></main> );
  }
}

export default About;