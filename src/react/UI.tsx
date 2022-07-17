import React, { FC } from 'react';
import useStore from './useStore';

const UI: FC = () => {
  const [playerVelocityX, playerVelocityY] = useStore(
    store => store.playerVelocity,
  );
  const playerHealth = useStore(store => store.playerHealth);
  const enemyHealth = useStore(store => store.enemyHealth);
  const blocked = useStore(store => store.blocked);
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="stat">
        <div className="stat-title">Player Velocity</div>
        <div className="stat-value">{playerVelocityX.toFixed(2)}</div>
        <div className="stat-value">{playerVelocityY.toFixed(2)}</div>
        <div className="stat-title">Enemy Health</div>
        <div className="stat-value">{enemyHealth}</div>
        <div className="stat-title">Blocked</div>
        <div className="stat-value">left: {blocked.left ? 'Yes' : 'No '}</div>
        <div className="stat-value">right: {blocked.right ? 'Yes' : 'No '}</div>
        <div className="stat-value">
          bottom: {blocked.bottom ? 'Yes' : 'No'}
        </div>
      </div>
      <div className="stat-title">Player Health</div>
      <div className="flex">
        {Array.from({ length: playerHealth }).map((_, i) => (
          <img key={i} src="assets/sprites/die.png" alt="player" />
        ))}
      </div>
    </div>
  );
};

export default UI;
