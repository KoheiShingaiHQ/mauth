import React, { Component } from 'react';
import { firebaseDb } from '../firebase/';

class ArticleHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return ( <h1 id="article-header-title">{this.props.title}</h1> );
  }
}

export default ArticleHeader;