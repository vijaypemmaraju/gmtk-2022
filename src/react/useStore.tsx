import create, { GetState, SetState } from 'zustand';

export type GameState = 'Menu' | 'Game';

type Store = {
  playerVelocity: number[];
  playerHealth: number;
  enemyHealth: number;
  blocked: {
    [key: string]: boolean;
  };
  debug: boolean;
  currentDieNumber: number;
  isDead: boolean;
  hasWon: boolean;
  gameState: GameState;
};
const storeFunction = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set: SetState<Store>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: GetState<Store>,
): Store => ({
  playerVelocity: [0, 0],
  playerHealth: 5,
  enemyHealth: 0,
  blocked: {},
  debug: false,
  currentDieNumber: 1,
  isDead: false,
  hasWon: false,
  gameState: 'Menu',
});
// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>(storeFunction);

export default useStore;
