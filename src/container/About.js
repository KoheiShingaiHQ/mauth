import React, { Component } from 'react';
import ContentsSquare from '../container/ContentsSquare.js';

class About extends Component {
  render() {
    const data = [
      {main: "GitHub", image: 'https://c1.staticflickr.com/5/4479/36953070364_f09ddc8cec_b.jpg', href: 'https://github.com/KoheiShingaiHQ/cmsy'}
      /*{main: "UI/UX", image: 'https://c1.staticflickr.com/5/4443/36992968563_7a4dae6a8f_b.jpg', href: '/article/ui-ux'},
      {main: "Prototyping", image: 'https://c1.staticflickr.com/5/4453/23810866228_40922c1f47_b.jpg', href: '/article/prototyping'},
      {main: "Java", image: 'https://c1.staticflickr.com/5/4506/36953070014_8be195a378_z.jpg', href: '/article/java-career'},
      {main: "Certification", image: 'https://c1.staticflickr.com/5/4476/36992969803_f40031f972_b.jpg', href: '/article/certification'},
      {main: "Activity", image: 'https://c1.staticflickr.com/5/4445/36992968773_05810c4e15_k.jpg', href: '/article/activity'},
      {main: "Data", image: 'https://c1.staticflickr.com/5/4493/36992968663_9d454b1722_b.jpg', href: 'https://docs.google.com/spreadsheets/d/1kC_j4cWM6I8czctA1HsqlXTqT79MGkA6SmRsFrAIMB8/edit?usp=sharing'}*/
    ];
    return (
      <main id="about">
        <ContentsSquare data={data}></ContentsSquare>
      </main>
    );
  }
}

export default About;