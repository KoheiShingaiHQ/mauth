import React, { Component } from 'react';
import Content from '../container/Content.js';

class ContentsFull extends Component {
  render() {
    return (
      <section id="contents-full">
        <ul>{contents}</ul>
      </section>
    );
  }
}

var contents = [];
var data = [
  {sub: 'Content management system yourself', color: 'rgba(255, 255, 255, 0.88)', image: 'https://www.toptal.com/designers/subtlepatterns/patterns/footer_lodyas.png'},
  {sub: 'Use cases of cmsy', color: 'rgba(255, 255, 255, 0.88)', image: 'https://www.toptal.com/designers/subtlepatterns/patterns/congruent_outline.png'},
  {sub: 'Getting started with your cmsy', color: 'rgba(255, 255, 255, 0.88)', image: 'https://www.toptal.com/designers/subtlepatterns/patterns/crissXcross.png'}
];
for(var i in data){
  contents.push(
    <li key={data[i].image} style={{backgroundImage:"url("+ data[i].image +")", height:data[i].height}}>
      <div>
        <Content full_main={data[i].main} full_sub={data[i].sub} color={data[i].color}></Content>
        <div></div>
      </div>
    </li>  
  );
}

export default ContentsFull;