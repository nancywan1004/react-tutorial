import React, { useEffect, useState } from 'react';
import Card from './Card';
import './Home.css';

function Home() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [cards, setCards] = useState([{"name": "Centiskorch","url": "https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH5/SWSH5_EN_30.png"},{"name": "Infernape","url": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY11/XY11_EN_20.png"},{"name": "Talonflame","url": "https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH3/SWSH3_EN_32.png"},{"name": "Tyflosion","url": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY8/XY8_EN_20.png"},{"name": "Volcarona","url": "https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH3/SWSH3_EN_30.png"}]);

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
                <input type="button" id="clear-inputs-button" value="Clear inputs" onClick={() => {
                    setName('');
                    setUrl('');
                }} />
                <div>
                <input type="button" id="add-button" value="Add" onClick={() => {
                    if (name == '' || url == '') {
                        return;
                    }
                    setCards([...cards, {name, url}]);
                }} />
                <input type="button" id="clear-cards-button" value="Clear cards" onClick={() => {setCards([])}} />
                </div>
			</form>
                {cards.map((elem, idx) => (
                        <div className='card-list' key={idx}>
                            <Card name={elem.name} url={elem.url} handleDelete={() => {setCards(cards.filter((card) => card !== elem))}}/>
                        </div>
                    )
                )}
        </div>
    )

}

export default Home;