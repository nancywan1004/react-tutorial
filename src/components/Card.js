import {useState, useRef} from 'react';
import Popup from './Popup';
import './Card.css';

async function handleCardDelete(id) {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`http://localhost:3001/cards/${id}`, options)
    .then(resp => resp.json());
}

async function handleEditSeries(id, series) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({series: series})
    }
    return fetch(`http://localhost:3001/cards/${id}`, options)
    .then(resp => resp.json());
}

const Card = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const seriesType = useRef(null);
    return (
        <div className="card-element">
            <div onClick={() => { setIsOpen(!isOpen); }}>
                <p>{props.name}</p>
                <img src={props.url} />
            </div>
            <button onClick={() => {
                handleCardDelete(props.id)
                .then(resp => props.handleDelete(resp)) // delete card on the front-end
                .catch((err) => console.log(err));
            }}>Delete</button>
                {isOpen && <Popup
      content={<>
        <b>{props.name}</b>
        <p><b>Image source: </b>{props.url}</p>
        {props.series === "" ? 
        <div>
            <select ref={seriesType}>
                <option value="battle style">Battle Style</option>
                <option value="pokemon v">Pokemon V</option>
            </select>
            <button onClick={() => { 
            const series = seriesType.current.value;
            handleEditSeries(props.id, series)
            .then(resp => props.handleSeriesUpdate(resp)) // update card on the front-end
            .catch((err) => console.log(err));
         }}>Save</button>
        </div> : <p><b>Series type: </b>{props.series}</p>}
        <button onClick={() => { setIsOpen(!isOpen); }}>Close</button>
      </>}
    />}
        </div>
    )
}

export default Card;