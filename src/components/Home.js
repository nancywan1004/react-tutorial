import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Home.css';

async function getCards() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=20').then((data) =>
    data.json()
  );
}

async function getCardsWithSeries(sType) {
  return fetch(`http://localhost:3001/cards/${sType}`).then((data) =>
    data.json()
  );
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
  const seriesType = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function fetchPokemonData(pokemon) {
      let url = pokemon.url; // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
      return fetch(url)
        .then((response) => response.json())
        .then(function (pokeData) {
          //console.log(pokeData);
          return pokeData;
        });
    }

    getCards().then((items) => {
      if (mounted && items.results) {
        const promises = items.results.map((pokemon) => {
          return fetchPokemonData(pokemon);
        });
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
        <h3>My Pokemon Collection</h3>
        {/* <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Url:
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </label>
        <input
          type="button"
          id="add-button"
          value="Add"
          onClick={() => {
            if (name === '' || url === '') {
              return;
            }
            addCard(name, url)
              .then((resp) => setCards([...cards, resp]))
              .catch((err) => console.log(err));
          }}
        />
        <input
          type="button"
          id="clear-inputs-button"
          value="Clear inputs"
          onClick={() => {
            setName('');
            setUrl('');
          }}
        /> */}
        <div>
          <label>Choose series: </label>
          <select ref={seriesType} defaultValue="">
            <option value="">All</option>
            <option value="battle style">Battle Style</option>
            <option value="pokemon v">Pokemon V</option>
          </select>
          <input
            type="button"
            id="filter-cards-button"
            value="Filter cards"
            onClick={() => {
              const series = seriesType.current.value;
              getCardsWithSeries(series)
                .then((items) => setCards(items))
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
            url={elem.sprites['front_default']}
            series={elem.series}
            id={elem._id}
            handleDelete={(resp) => {
              setCards(cards.filter((card) => card._id !== resp._id));
            }}
            handleSeriesUpdate={(resp) => {
              setCards(
                cards.map((card) =>
                  card._id === resp._id
                    ? { ...card, series: resp.series }
                    : card
                )
              );
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
