import React, { Component } from 'react';
import { hideMenu, setFooterOpacity, getCurrentPath } from '../container/Util.js';
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
  setScrollStatus() {
    if (document.getElementById('about')) {
      var header = document.getElementsByTagName('header')[0];
      var main = document.getElementById('about');
      var footer = document.getElementsByTagName('footer')[0];
      var b = window.innerHeight;
      var h = header.scrollHeight;
      var m = main.scrollHeight;
      var f = footer.scrollHeight;
      var t = b - (h + m + f);
      footer.dataset.scroll = (t < 12) ? true : false;
    }
  }
  initAbout() {
    localStorage.language = 'english';
    var language = localStorage.language.substring(0, 2);
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
        self.setScrollStatus();
      }
    });
  }
  componentDidMount() {
    hideMenu();
    setFooterOpacity(0);
    this.initAbout();
    var self = this;
    window.addEventListener('resize', function (event) {
      self.setScrollStatus();
    });
  }
  render() {
    return ( <main id="about"></main> );
  }
}

export default About;