import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Home.css';

function Home() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [cards, setCards] = useState([]);
  const abilityType = useRef(null);

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
            url={elem.sprites['front_default']}
            ability={elem.ability}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
