import React, { Component } from 'react';
import ContentsSquare from '../container/ContentsSquare.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class About extends Component {
  constructor(props) {
    super(props);
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
  hideScreen() {
    var header = document.getElementsByTagName('header')[0];
    var main = document.getElementsByTagName('main')[0];
    var searchResult = document.getElementById('search-result');
    header.classList.remove('show-menu');
    if (main) {
      main.classList.remove('show-search');
    }
    if (searchResult) {
      if (window.location.hash === "#/") {
        searchResult.classList.remove('show');
        document.getElementById('search-input').value = "";
      }
    }
  }
  setFooterOpacity(opacity) {
    document.getElementsByTagName("footer")[0].style.opacity = opacity;
  }
  initAbout() {
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    var aboutTag = document.getElementById("about");
    var about = firebaseDb.ref("tutorial/" + language);
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
        self.setFooterOpacity(1);
        self.setScrollStatus();
      }
    });
  }
  componentDidMount() {
    this.hideScreen();
    this.setFooterOpacity(0);
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