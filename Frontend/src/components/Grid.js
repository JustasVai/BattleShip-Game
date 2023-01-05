import React from 'react';
import './Grid.css'; // Import the CSS file

const Grid = ({ grid, handleClick }) => {
  const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="grid-container">
      <div className="letters">
        {letters.map(letter => (
          <div key={letter} className="letter">{letter}</div>
        ))}
      </div>
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            <div className="number">{i + 1}</div>
            {row.map((cell, j) => (
              <div key={j} className="cell" style={{ backgroundColor: cell.color }} 
                onClick={() => handleClick(i, j)}>
                {cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;