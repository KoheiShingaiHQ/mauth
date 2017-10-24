import React, { Component } from 'react';
import ContentsFull from '../container/ContentsFull.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class ContentTop extends Component {
  constructor(props) {
    super(props);
  }
  initContentTop() {
  }
  componentDidMount() {
    this.initContentTop();
  }
  render() {
    return ( 
      <section id="content-top" className={this.props.language}>
        <section id="contents-full">
          <ContentsFull data={this.props.data}></ContentsFull>
        </section>
      </section>
    );
  }
}

export default ContentTop;