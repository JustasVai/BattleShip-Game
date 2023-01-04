import React, { useState } from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({score, shots }) => {
  return (
    <div className="player-info">
      <div className="player-shots">Shots left: {shots}</div>
    </div>
  );
};

export default PlayerInfo;