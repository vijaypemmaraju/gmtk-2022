import React, { FC } from 'react';
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
        className="p-6 w-[25%] flex"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <img src={`assets/sprites/dieFaces${currentDieNumber}.png`} alt="" />
        <h6 className="pl-2">{WEAPON_NAMES[currentDieNumber]}</h6>
      </div>
    </div>
  );
};

export default UI;
