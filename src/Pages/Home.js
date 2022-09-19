import React from 'react';
import Planets from '../Componentes/Planets';
import Header from '../Componentes/Header';

function Home() {
  return (
    <>
      <div className="title">
        <img alt="baby-yoda" src="https://media3.giphy.com/media/z3iN1cvskVRqhf6PLf/giphy.gif?cid=ecf05e47m73dju610231rirhqrad54dkxcfygn9f4zlq6w23&rid=giphy.gif&ct=s" />
        <p>Explore os planetas</p>
      </div>
      <div>
        <Header />
        <Planets />
      </div>
      <h1>Que a força esteja com você!</h1>
    </>
  );
}

export default Home;
