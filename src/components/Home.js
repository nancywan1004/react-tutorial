import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Home.css';

async function getCards() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((data) => data.json())
    .then((items) => {
      return items.results.map((pokemon) => {
        let url = pokemon.url;
        return fetch(url)
          .then((response) => response.json())
          .then((pokeData) => {
            return pokeData;
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
}

async function getCardsWithAbility(ability) {
  return fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
    .then((data) => data.json())
    .then((items) => {
      return items.pokemon.map((pokemon) => {
        let url = pokemon.pokemon.url;
        return fetch(url)
          .then((response) => response.json())
          .then((pokeData) => {
            return pokeData;
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
}

async function addCard(name, url) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      url: url,
    }),
  };
  return fetch('http://localhost:3001/cards', options).then((data) =>
    data.json()
  );
}

function Home() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [cards, setCards] = useState([]);
  const abilityType = useRef(null);

  useEffect(() => {
    let mounted = true;

    getCards().then((promises) => {
      if (mounted && promises) {
        Promise.all(promises).then((allPokemonData) => {
          setCards(allPokemonData);
        });
      }
    });

    return () => (mounted = false);
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
          <input
            type="button"
            id="filter-cards-button"
            value="Filter cards"
            onClick={() => {
              const ability = abilityType.current.value;
              getCardsWithAbility(ability)
                .then((promises) => {
                  // if (items.pokemon) {
                  // const promises = items.pokemon.map((pokemonData) => {
                  //   return fetchPokemonData(pokemonData.pokemon);
                  // });
                  Promise.all(promises).then((allPokemonData) => {
                    setCards(allPokemonData);
                  });
                  // }
                })
                .catch((err) => console.log(err));
            }}
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
            ability={elem.abilities}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
