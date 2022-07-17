import Grenade, { GrenadeStats } from '../Grenade';

const PlayerGrenadeStats: GrenadeStats = {
  damage: 50,
  startSpeed: 20,
  secondsToExplode: 1,
  damageRadius: 100,
  speed: 0,
  target: 'enemy',
};

export default class PlayerGrenade extends Grenade {
  stats = PlayerGrenadeStats;
}
