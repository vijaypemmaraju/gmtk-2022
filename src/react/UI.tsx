import React, { FC, useEffect } from 'react';
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
  const playerHealth = useStore(store => store.playerHealth);
  const enemyHealth = useStore(store => store.enemyHealth);
  const debug = useStore(store => store.debug);
  const currentDieNumber = useStore(store => store.currentDieNumber);
  const isDead = useStore(store => store.isDead);
  const hasWon = useStore(store => store.hasWon);

  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isDead || hasWon) {
      modalToggleRef.current!.checked = true;
    }
  });

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
      <input
        type="checkbox"
        id="death-modal"
        className="modal-toggle"
        ref={modalToggleRef}
      />
      <div className="modal">
        <div className="modal-box">
          {isDead && (
            <>
              <h3 className="text-lg font-bold">Ouch...</h3>
              <p className="py-4">That looked like it hurt.</p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => location.reload()}
                >
                  Try Again
                </button>
              </div>
            </>
          )}
          {!isDead && hasWon && (
            <>
              <h3 className="text-lg font-bold">You Win!</h3>
              <p className="py-4">You killed the enemy and won the game.</p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => location.reload()}
                >
                  Play Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UI;
