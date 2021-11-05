import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Home.css';

async function fetchPokemonResources(pokemon) {
  // Task #1 TODO
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((resp) => {
      return resp.json();
    })
    .then((items) => {
      return items.results.map((pokemon) => {
        return fetch(pokemon.url).then((response) => {
          return response.json();
        });
      });
    });
}

function Home() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [cards, setCards] = useState([]);
  const abilityType = useRef(null);

  // Only called when the component first renders
  useEffect(() => {
    // Task #1 TODO
    fetchPokemonResources().then((promises) => {
      Promise.all(promises).then((resp) => {
        setCards(resp);
      });
    });
  }, []);

  return (
    <div>
      <form className="add">
        <h2>My Pokemon Collection</h2>
        <div>
          <label>Choose ability: </label>
          <select ref={abilityType} defaultValue="">
            <option value="">All</option>
            <option value="stench">Stench</option>
            <option value="frisk">Frisk</option>
          </select>
          {/* Challenge TODO */}
          <input
            type="button"
            id="filter-cards-button"
            value="Filter cards"
            onClick={() => {}}
          />
          <input
            type="button"
            id="clear-cards-button"
            value="Clear cards"
            onClick={() => {
              setCards([]);
            }}
          />
        </div>
      </form>
      {cards.map((elem, idx) => (
        <div className="card-list" key={idx}>
          <Card
            name={elem.name}
            imageUrl={elem.sprites['front_default']}
            ability={elem.ability}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
