import HomingProjectile, { HomingProjectileStats } from '../HomingProjectile';

const PlayerHomingMissleStats: HomingProjectileStats = {
  damage: 2,
  speed: 2,
  homingForce: 100,
  target: 'enemy',
};

export default class PlayerHomingMissle extends HomingProjectile {
  textureKey: string = 'player-bullet';

  stats = PlayerHomingMissleStats;
}
