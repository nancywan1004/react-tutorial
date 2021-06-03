import {useState} from 'react';
import Popup from './Popup';

const Card = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div onClick={() => { setIsOpen(!isOpen); }}>
                <p>{props.name}</p>
                <img src={props.url} />
            </div>
            <button onClick={props.handleDelete}>Delete</button>
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