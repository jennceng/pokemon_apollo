import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PokemonInfo from './PokemonInfo';

const GET_POKEMONS = gql`
  query {
    pokemons(first: 150) {
      id
    }
  }
`

const GET_POKEMON = gql`
  query($pokemonId: String!) {
    pokemon(id: $pokemonId) {
      id
      name
      image
      attacks {
        fast {
          name
          type
          damage
  			}
        special {
          name
        }
      }
      weaknesses
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const [getPokemon, { loading: pokemonLoading , data: pokemonData }] = useLazyQuery(GET_POKEMON);
  console.log(pokemonData)
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }

    return (<div className="App">
      <div>
        {data && data.pokemons && data.pokemons.map(p =>
          <span key={p.id}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
              onClick={() => getPokemon({variables: {pokemonId: p.id}})}
              height={50}
              width={50}
            />
        </span>)}
      </div>
      {pokemonData && pokemonData.pokemon &&  <PokemonInfo {...pokemonData.pokemon} />}
    </div>
  )

}

export default App;
