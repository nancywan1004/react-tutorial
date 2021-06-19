import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Home.css';

async function getCards() {
    return fetch('http://localhost:3001/cards')
    .then((data) => data.json());
}

async function getCardsWithSeries(sType) {
    return fetch(`http://localhost:3001/cards/${sType}`)
    .then((data) => data.json());
}

async function addCard(name, url) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            url: url
        })
    }
    return fetch('http://localhost:3001/cards', options)
    .then((data) => data.json());
}

function Home() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [cards, setCards] = useState([]);
    const seriesType = useRef(null);

    useEffect(() => {
        let mounted = true; 
        getCards().then(items => {
            if (mounted) {
                setCards(items);
            }
          });
        return () => mounted = false; 
      }, [])

    return (
        <div>
            <form className="add">
				<label>
					Name:
					<input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
				</label>
                <label>
					Url:
					<input type="text" value={url} onChange={(e) => {setUrl(e.target.value)}} />
				</label>
                <input type="button" id="add-button" value="Add" onClick={() => {
                    if (name === '' || url === '') {
                        return;
                    }
                    addCard(name, url)
                    .then(() => setCards([...cards, {name, url}]))
                    .catch((err) => console.log(err));
                }} />
                <input type="button" id="clear-inputs-button" value="Clear inputs" onClick={() => {
                    setName('');
                    setUrl('');
                }} />
                <div>
                <label>Choose series:  </label>
                <select ref={seriesType}>
                    <option value="battle style">Battle Style</option>
                    <option value="pokemon v">Pokemon V</option>
                </select>
                <input type="button" id="filter-cards-button" value="Filter cards" onClick={() => {
                    const series = seriesType.current.value;
                    getCardsWithSeries(series)
                    .then((items) => setCards(items))
                    .catch((err) => console.log(err));
                }} />
                <input type="button" id="clear-cards-button" value="Clear cards" onClick={() => {setCards([])}} />
                </div>
			</form>
                {cards.map((elem, idx) => (
                        <div className='card-list' key={idx}>
                            <Card name={elem.name} url={elem.url} index={idx} handleDelete={() => {setCards(cards.filter((card) => card !== elem))}}/>
                        </div>
                    )
                )}
        </div>
    )

}

export default Home;