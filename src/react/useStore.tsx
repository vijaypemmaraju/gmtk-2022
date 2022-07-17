import create, { GetState, SetState } from 'zustand';

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
});
// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>(storeFunction);

export default useStore;
