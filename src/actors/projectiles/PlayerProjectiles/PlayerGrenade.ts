import Grenade, { GrenadeStats } from '../Grenade';

const PlayerGrenadeStats: GrenadeStats = {
  damage: 50,
  startSpeed: 23,
  secondsToExplode: 1,
  damageRadius: 100,
  speed: 0,
  target: 'enemy',
};

export default class PlayerGrenade extends Grenade {
  textureKey: string = 'player-grenade';

  stats = PlayerGrenadeStats;
}
