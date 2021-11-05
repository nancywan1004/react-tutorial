import React, { useState, useRef } from 'react';
import Popup from './Popup';
import './Card.css';

const Card = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
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
                {props.url}
              </p>
              <p>
                <b>Ability type: </b>
                {props.ability.map((ability, idx) => {
                  console.log(ability);
                  return (
                    <span key={idx}>
                      {ability.ability.name}
                      <br />
                    </span>
                  );
                })}
              </p>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Close
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default Card;
