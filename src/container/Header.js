import React, { Component } from 'react';
import Nav from '../container/Nav.js';
import Search from '../container/Search.js';

class Header extends Component {
  clickMenu(e) {
    e.preventDefault();
    var header = document.getElementsByTagName('header')[0];
    header.classList.toggle('show-menu');
  }
  clickSearch(e) {
    e.preventDefault();
    var main = document.getElementsByTagName('main')[0];
    main.classList.toggle('show-search');
  }
  render() {
    return (
      <header>
        <div className="left">
          <svg className="menu" width="24px" height="24px" viewBox="0 0 24 24" onClick={this.clickMenu}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
          <a href="/"><h1>{this.props.title}</h1></a>
          <Nav></Nav>
          <svg data-selected={window.location.hash.split("#").join("").split("/")[1]} className="search-button" width="24px" height="24px" viewBox="0 0 24 24" onClick={this.clickSearch}><path d="M0 0h24v24H0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
        </div>
        <div className="right"><Search></Search></div>
      </header>
    );
  }
}

export default Header;