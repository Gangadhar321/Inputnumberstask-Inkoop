import React, { useState } from 'react';
import './Number.css';

const NumberInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    const number = parseInt(value, 10);

    if (value === '' || Number.isInteger(number)) {
      setInputValue(value);

      if (value === '') {
        setMessage('');
        setNumbers([]);
      } else if (number < 0) {
        setMessage('Enter a positive value');
        setNumbers([]);
      } else {
        const nextNumbers = getNextNumbers(number);
        setNumbers(nextNumbers);
        setMessage('');
      }
    } else {
      setMessage('Please enter only numbers');
    }
  };

  const handleIncrement = () => {
    const number = parseInt(inputValue, 10) || 0;
    const nextNumber = number + 1;
    setInputValue(nextNumber.toString());
    updateNumbers(nextNumber);
  };

  const handleDecrement = () => {
    const number = parseInt(inputValue, 10) || 0;
    const nextNumber = number - 1;
    setInputValue(nextNumber.toString());
    updateNumbers(nextNumber);
  };

  const updateNumbers = (number) => {
    if (number < 0) {
      setMessage('Enter a positive value');
      setNumbers([]);
    } else {
      const nextNumbers = getNextNumbers(number);
      setNumbers(nextNumbers);
      setMessage('');
    }
  };

  const getNextNumbers = (number) => {
    const nextNumbers = [];
    const start = number % 2 === 0 ? number + 2 : number + 2;
    for (let i = 0; i < 3; i++) {
      nextNumbers.push(start + i * 2);
    }
    return nextNumbers;
  };

  return (
    <div className="number-input-container">
      <div className="number-input-wrapper">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a number"
          min="0"
          className="number-input"
        />
        <button
          onClick={handleDecrement}
          className="number-input-button number-input-decrement"
        >
          &#9660; {/* Down Arrow */}
        </button>
        <button
          onClick={handleIncrement}
          className="number-input-button number-input-increment"
        >
          &#9650; {/* Up Arrow */}
        </button>
      </div>
      {message && <p className="message">{message}</p>}
      {numbers.length > 0 && (
        <ul className="number-list">
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NumberInput;
