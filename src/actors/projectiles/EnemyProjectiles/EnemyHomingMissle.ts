import HomingProjectile, { HomingProjectileStats } from '../HomingProjectile';

const EnemyHomingMissleStats: HomingProjectileStats = {
  damage: 1,
  speed: 2,
  homingForce: 100,
  target: 'player',
};

export default class EnemyHomingMissle extends HomingProjectile {
  stats = EnemyHomingMissleStats;
}
