import React from 'react';
import './App.css';
import { gql } from "apollo-boost";

function PokemonInfo ({image, name, attacks, weaknesses}) {
  return (
    <div>
      <h2>You Selected {name}!</h2>
      <div>
        <img src={image} height={50} width={50} />
      </div>
      Attacks:
      <br />
      {attacks.fast && attacks.fast.map(f => <div>name: {f.name}.  type: {f.type} damage: {f.damage}</div>)}
      <br />
      Specials:
      {attacks.special && attacks.special.map(s => <span>{s.name}</span>)}
      <br />
      {weaknesses.map(w => <span>{w}</span>)}
    </div>
  )
}

export default PokemonInfo;
