import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  componentDidMount() {
    var menu = [];
    var data = [
      {name: 'Tutorial', path: '/tutorial'},
      {name: 'Docs', path: '/docs'}
    ];
    for(var i in data){
      menu.push(<Link to={data[i].path} key={data[i].name}><li className={data[i].name}>{data[i].name}</li></Link>);
    }
    this.setState({ menu : menu });
  }
  render() {
    return (
      <nav>
        <ul data-selected={window.location.hash.split("#").join("").split("/")[1]}>
          <li id="close-menu" onClick={this.closeMenu}>☓</li>
          {this.state.menu}
        </ul>
      </nav>
    );
  }
}

export default Nav;