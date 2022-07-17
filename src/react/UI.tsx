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
  const gameState = useStore(store => store.gameState);

  const modalToggleRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isDead || hasWon) {
      modalToggleRef.current!.checked = true;
    }
  });

  return (
    <div className="w-[100vw] h-[100vh]">
      {debug && <Debug />}
      {gameState === 'Menu' && (
        <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center">
          <h1 className="pb-4 text-5xl">The Last D6</h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => useStore.setState({ gameState: 'Game' })}
          >
            Start Game
          </button>
        </div>
      )}
      {gameState === 'Game' && (
        <>
          <div className="flex">
            <div
              className="w-[340px] stats stats-vertical"
              style={{ backgroundColor: 'rgb(49, 46, 127, .6)' }}
            >
              <div className="stat">
                <div className="stat-title">Weapon</div>
                <div className="flex w-full stat-value">
                  <img
                    src={`assets/sprites/dieFaces${currentDieNumber}.png`}
                    alt=""
                    style={{ width: 40 }}
                  />
                </div>
                <div className="text-lg stat-desc">
                  {WEAPON_NAMES[currentDieNumber]}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Health</div>
                <div className="flex stat-value">
                  {Array.from({ length: playerHealth }).map((_, i) => (
                    <img
                      key={i}
                      src="assets/sprites/dieFaces1.png"
                      alt="player"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start justify-center w-full pt-4 opacity-70">
              <div className="w-[80%] text-center">
                <h1 className="text-5xl">D4</h1>
                <h1 className="text-3xl">The All-Seeing Die</h1>
                <div
                  className="w-full h-5 bg-red-800"
                  style={{
                    width: `${(enemyHealth / EnemyStats.maxHealth) * 100}%`,
                  }}
                />
              </div>
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
                <div>
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
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UI;
