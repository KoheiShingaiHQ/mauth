import React, { Component } from 'react';
import ArticleHeader from '../container/ArticleHeader.js';
import ContentTimeline from '../container/ContentTimeline.js';
import ContentGithub from '../container/ContentGithub.js';
import ContentTop from '../container/ContentTop.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

const components = {
  "timeline" : ContentTimeline,
  "github" : ContentGithub,
  "top" : ContentTop
};

const title = {
  "en" : "Featured",
  "ja" : "特集"
}

class ContentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { language : "", title : "" }
  }
  initContent(id) {
    var path = (id === "top") ? "top" : "article/" + id;
    localStorage.language = localStorage.language || "english";
    var language = localStorage.language.substring(0, 2);
    var panelTag = document.getElementById("content-panel");
    /*const hue = firebaseDb.ref(path + "/hue");
    hue.on('value', function(snapshot) {
      const val = snapshot.val() || 0;
      contentPanel.style.filter = "hue-rotate(" + val + "deg)";
    });*/
    const article = firebaseDb.ref(path + "/" + language);
    article.on('value', function(snapshot) {
      const val = snapshot.val();
      var headerTag = document.createElement("section");
      var contentTag = document.createElement("div");
      headerTag.id = "article-header";
      headerTag.classList.add(language);
      contentTag.id = "content-tag";
      panelTag.innerHTML = "";
      panelTag.appendChild(headerTag);
      panelTag.appendChild(contentTag);
      const header = React.createElement(ArticleHeader, {
        language : language,
        title : (id === "top") ? title[language] : ""
      });
      const content = React.createElement(components[(id === "top") ? "top" : ""], {
        language : language,
        data : (id === "top") ? val.full : ""
      });
      ReactDOM.render(header, headerTag);
      ReactDOM.render(content, contentTag);
      /*for (var i in val) {
        const data = val[i];
        var section = document.createElement("section");
        var sectionId = (data.article || data.revision || data.file || data.project);
        section.id = "content-" + sectionId;
        section.dataset.removal = true;
        contentPanel.appendChild(section);
        var props = {};
        for (var j in data) {
          props[j] = data[j];
          props["id"] = sectionId;
          props["hue"] = contentPanel.style.filter;
          props["language"] = language;
        }
        var element = React.createElement(components[data.type], props);
        ReactDOM.render(element, document.getElementById("content-" + sectionId));
      }*/
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.id) {
      this.initContent(nextProps.id);
    }
  }
  componentDidMount() {
    this.initContent(this.props.id);
  }
  render() {
    return ( <article id="content-panel"></article> );
  }
}

export default ContentPanel;