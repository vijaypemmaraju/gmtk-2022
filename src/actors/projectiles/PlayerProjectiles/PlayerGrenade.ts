import Grenade, { GrenadeStats } from '../Grenade';

const PlayerGrenadeStats: GrenadeStats = {
  damage: 50,
  startSpeed: 1,
  secondsToExplode: 2,
  damageRadius: 5,
  speed: 0,
  target: 'enemy',
};

export default class PlayerGrenade extends Grenade {
  stats = PlayerGrenadeStats;
}
