import {useState} from 'react';
import Popup from './Popup';
import './Card.css';

async function handleCardDelete(index) {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    return fetch(`http://localhost:3001/cards/${index}`, options)
    .then(resp => resp.json());
}

const Card = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="card-element">
            <div onClick={() => { setIsOpen(!isOpen); }}>
                <p>{props.name}</p>
                <img src={props.url} />
            </div>
            <button onClick={() => {
                handleCardDelete(props.index)
                .then(props.handleDelete())
                .catch((err) => console.log(err));
            }}>Delete</button>
                {isOpen && <Popup
      content={<>
        <b>{props.name}</b>
        <p><b>Image source: </b>{props.url}</p>
        <button onClick={() => { setIsOpen(!isOpen); }}>Close</button>
      </>}
    />}
        </div>
    )
}

export default Card;