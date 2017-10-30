import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const path = { list : "/category", detail : "/article" };

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { menu : [] }
  }
  closeMenu(e) {
    e.preventDefault();
    var header = document.getElementsByTagName('header')[0];
    header.classList.remove('show-menu');
  }
  getObjectName(currentPath) {
    for (var i in path) {
      if (currentPath === path[i]) {
        return i;
      }
    }
  }
  componentDidMount() {
    var menu = [];
    var data = [
      {name: path.list.split('/').join(''), path: path.list, class: 'list'},
      {name: path.detail.split('/').join(''), path: path.detail, class: 'detail'}
    ];
    for(var i in data){
      menu.push(<Link to={data[i].path} key={data[i].name}><li className={data[i].class}>{data[i].name}</li></Link>);
    }
    this.setState({ menu : menu });
  }
  render() {
    return (
      <nav>
        <ul data-selected={this.getObjectName("/" + window.location.hash.split("#").join("").split("/")[1]) || ""}>
          <li id="close-menu" onClick={this.closeMenu}>☓</li>
          {this.state.menu}
        </ul>
      </nav>
    );
  }
}

export default Nav;