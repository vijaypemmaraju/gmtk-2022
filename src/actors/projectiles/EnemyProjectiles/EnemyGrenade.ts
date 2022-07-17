import Grenade, { GrenadeStats } from '../Grenade';

const EnemyGrenadeStats: GrenadeStats = {
  damage: 1,
  startSpeed: 50,
  secondsToExplode: 4,
  damageRadius: 2,
  speed: 0,
  target: 'player',
};

export default class EnemyGrenade extends Grenade {
  stats = EnemyGrenadeStats;
}
