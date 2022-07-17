import HomingProjectile, { HomingProjectileStats } from '../HomingProjectile';

const EnemyHomingMissleStats: HomingProjectileStats = {
  damage: 1,
  speed: 1,
  homingForce: 10,
  target: 'player',
};

export default class EnemyHomingMissle extends HomingProjectile {
  stats = EnemyHomingMissleStats;
}
