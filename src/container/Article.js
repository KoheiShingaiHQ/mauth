import React, { Component } from 'react';
import ContentPanel from '../container/ContentPanel.js';
import SidePanel from '../container/SidePanel.js';
import ReactDOM from 'react-dom';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { id : this.props.match.params.id || "" }
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
  setFooterOpacity(opacity) {
    document.getElementsByTagName("footer")[0].style.opacity = opacity;
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
  updateArticle(id) {
    var articleTag = document.getElementById("article");
    if (articleTag) {
      articleTag.innerHTML = "";
      var contentTag = document.createElement("div");
      var sideTag = document.createElement("div");
      contentTag.id = "content-tag";
      sideTag.id = "side-tag";
      articleTag.appendChild(contentTag);
      articleTag.appendChild(sideTag);
      const content = React.createElement(ContentPanel, {id : id});
      const side = React.createElement(SidePanel, {id : id});
      ReactDOM.render(content, contentTag);
      ReactDOM.render(side, sideTag);
    }
  }
  initArticle(props) {
    this.updateArticle(props.match.params.id || "top");
    var self = this;
    window.addEventListener("hashchange", function(){
      var id = window.location.hash.split("#/docs").join("");
      id = id.split("/").join("");
      if (!window.id || window.id !== id) {
        window.id = id;
        self.updateArticle(id || "top");
        self.hideScreen();
        self.setScrollStatus();
      }
    }, false);
  }
  componentDidMount() {
    this.hideScreen();
    this.setFooterOpacity(1);
    this.initArticle(this.props);
  }
  render() {
    return ( <main id="article"></main> );
  }
}

export default Article;