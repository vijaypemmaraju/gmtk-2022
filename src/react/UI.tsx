import React, { FC } from 'react';
import useStore from './useStore';

const UI: FC = () => {
  const [playerVelocityX, playerVelocityY] = useStore(
    store => store.playerVelocity,
  );
  const playerHealth = useStore(store => store.playerHealth);
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="stat">
        <div className="stat-title">Player Velocity</div>
        <div className="stat-value">{playerVelocityX.toFixed(2)}</div>
        <div className="stat-value">{playerVelocityY.toFixed(2)}</div>
      </div>
      <div className="flex">
        {Array.from({ length: playerHealth }).map((_, i) => (
          <img key={i} src="assets/sprites/die.png" alt="player" />
        ))}
      </div>
    </div>
  );
};

export default UI;
