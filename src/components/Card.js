import React, { useState } from 'react';
import Popup from './Popup';
import './Card.css';

const Card = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Task #2 TODO */}
      <div onClick={}>
        <p>{props.name}</p>
        <img className="card-element" src={props.imageUrl} />
      </div>
      {isOpen && (
        <Popup
          content={
            <>
              <b>{props.name}</b>
              <p>
                <b>Image source: </b>
                {props.imageUrl}
              </p>
              <p><b>Ability type: </b>
              {/* Challenge TODO */}
              </p>
              {/* Task #2 TODO */}
              )<button onClick={}>Close</button>
            </>
          }
        />
      )}
    </div>
  );
};

export default Card;
