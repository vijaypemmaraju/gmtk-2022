import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
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
          <h4 className="pb-4 text-xl">
            A lone die, the last of his kind, fights for the future of his race.
          </h4>
          <button
            type="button"
            className="pointer-events-auto btn btn-primary"
            onClick={() => useStore.setState({ gameState: 'Game' })}
          >
            Start Game
          </button>
          <div className="divider" />
          <h1 className="py-4 text-3xl">Controls</h1>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="p-3 border border-gray-900 rounded-xl bg-base-100">
              <h2 className="py-4 text-2xl">Movement</h2>
              <div className="flex gap-3 py-1">
                <kbd className="kbd">A</kbd>
                <kbd className="kbd">D</kbd>
              </div>
              <div className="flex gap-3 py-1">
                <kbd className="kbd">???</kbd>
                <kbd className="kbd">???</kbd>
              </div>
            </div>
            <div className="p-3 border border-gray-900 rounded-xl bg-base-100">
              <h2 className="py-4 text-2xl">Jump / Double Jump</h2>
              <kbd className="m-1 kbd">W</kbd>
              <kbd className="m-1 kbd">???</kbd>
              <kbd className="m-1 kbd">Space</kbd>
            </div>
            <div className="p-3 border border-gray-900 rounded-xl bg-base-100">
              <h2 className="py-4 text-2xl">Dodge Roll</h2>
              <kbd className="my-1 kbd">Shift</kbd>
            </div>
            <div className="p-3 border border-gray-900 rounded-xl bg-base-100">
              <h2 className="py-4 text-2xl">Fire Weapon</h2>
              <img src="assets/sprites/leftMouse.png" alt="" />
              <h2 className="py-4 text-base">(Left Mouse Click)</h2>
            </div>
            <div className="p-3 border border-gray-900 rounded-xl bg-base-100">
              <h2 className="py-4 text-2xl">Switch Weapon</h2>
              <p>
                Weapon Switching is triggered when double-jumping or
                dodge-rolling
              </p>
            </div>
          </div>
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
                <div className="text-2xl stat-desc">
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
            <div className="flex items-start justify-center w-full pt-8 opacity-70">
              <div className="w-[80%] text-center">
                <h1 className="text-5xl">D4</h1>
                <h1 className="text-3xl">The All-Seeing Die</h1>
                <motion.div
                  className="w-full h-5 mt-2 bg-red-800 border-2 border-black"
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${(enemyHealth / EnemyStats.maxHealth) * 100}%`,
                  }}
                  transition={{
                    duration: 0.5,
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
                  <p className="py-4">Better luck next time.</p>
                  <div className="modal-action">
                    <button
                      type="button"
                      className="pointer-events-auto btn"
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
                  <p className="py-4">
                    You have restored peace to the world of dice.
                  </p>
                  <div className="modal-action">
                    <button
                      type="button"
                      className="pointer-events-auto btn"
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
