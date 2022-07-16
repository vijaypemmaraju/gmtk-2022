import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  playerVelocity: number[];
  playerHealth: number;
};
const storeFunction = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set: SetState<Store>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: GetState<Store>,
): Store => ({
  playerVelocity: [0, 0],
  playerHealth: 5,
});
// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>(
  persist((set, get) => storeFunction(set, get), {
    name: 'store',
  }),
);

export default useStore;