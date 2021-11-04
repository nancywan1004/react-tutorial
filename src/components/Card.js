import React, { useState } from 'react';
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
        <img className="card-element" src={props.url} />
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
              )
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
