import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import ContentsFull from '../container/ContentsFull.js';
import ContentsHalf from '../container/ContentsHalf.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = { language : "" };
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
  initTop() {
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    this.setState({ language : language });
    var topTag = document.getElementById("top");
    var top = firebaseDb.ref("top/" + language);
    var self = this;
    top.on('value', function(snapshot) {
      const val = snapshot.val();
      if (topTag && val) {
        var fullTag = document.createElement("section");
        fullTag.id = "contents-full";
        topTag.innerHTML = "";
        topTag.appendChild(fullTag);
        const full = React.createElement(ContentsFull, {data : val.full});
        ReactDOM.render(full, fullTag);
        self.setFooterOpacity(1);
      }
    });
  }
  componentDidMount() {
    this.hideScreen();
    this.setFooterOpacity(0);
    this.initTop();
  }
  render() {
    return ( <main id="top" className={this.state.language}></main> );
  }
}

export default Top;