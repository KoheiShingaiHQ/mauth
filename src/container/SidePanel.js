import React, { Component } from 'react';
import SideLanguage from '../container/SideLanguage.js';
import SideRelated from '../container/SideRelated.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

const components = {
  "language" : SideLanguage,
  "related" : SideRelated
};

class SidePanel extends Component {
  initSide(id) {
    var path = (id === "top") ? "top" : "detail/" + id;
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    var sidePanel = document.getElementById("side-panel");
    var removes = sidePanel.querySelectorAll("[data-removal='true']");
    for (var e of removes) { e.parentNode.removeChild(e) }
    var side = firebaseDb.ref(path + "/" + language + "/side");
    side.on('value', function(snapshot) {
      const val = snapshot.val();
      for (var i in val) {
        const data = val[i];
        var sideTag = document.createElement("section");
        sideTag.id = "side-" + i;
        sidePanel.appendChild(sideTag);
        var props = {};
        for (var j in data) {
          props[j] = data[j];
          language = data[j].match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/) === null ? "en" : "ja";
          props["id"] = id;
          props["language"] = language;
        }
        var side = React.createElement(components[i], props);
        ReactDOM.render(side, sideTag);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.id) {
      this.initSide(nextProps);
    }
  }
  componentDidMount() {
    this.initSide(this.props.id);
  }
  render() {
    return (
      <section id="side-panel"></section>
    );
  }
}

export default SidePanel;