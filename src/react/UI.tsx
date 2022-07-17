import React, { FC } from 'react';
import { EnemyStats } from '../actors/characters/Enemy';
import Debug from './Debug';
import useStore from './useStore';

const WEAPON_NAMES = {
  1: 'Basic',
  2: 'Spread',
  3: 'Triple Shot',
  4: "'Splosions",
  5: 'The Deluge',
  6: 'Take Me Home',
};

const UI: FC = () => {
  const [playerVelocityX, playerVelocityY] = useStore(
    store => store.playerVelocity,
  );
  const playerHealth = useStore(store => store.playerHealth);
  const enemyHealth = useStore(store => store.enemyHealth);
  const blocked = useStore(store => store.blocked);
  const debug = useStore(store => store.debug);
  const currentDieNumber = useStore(store => store.currentDieNumber);
  return (
    <div className="w-[100vw] h-[100vh]">
      {debug && <Debug />}
      <div
        className="w-full h-5 bg-red-800"
        style={{ width: `${(enemyHealth / EnemyStats.maxHealth) * 100}%` }}
      />
      <div
        className="p-6 w-[25%]"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <h4>Weapon</h4>
        <div className="flex">
          <img src={`assets/sprites/dieFaces${currentDieNumber}.png`} alt="" />
          <h6 className="pl-2">{WEAPON_NAMES[currentDieNumber]}</h6>
        </div>
        <h4>Health</h4>
        <div className="flex">
          {Array.from({ length: playerHealth }).map((_, i) => (
            <img key={i} src="assets/sprites/dieFaces1.png" alt="player" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UI;
