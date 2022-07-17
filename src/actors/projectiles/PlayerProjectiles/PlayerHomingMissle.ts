import HomingProjectile, { HomingProjectileStats } from '../HomingProjectile';

const PlayerHomingMissleStats: HomingProjectileStats = {
  damage: 10,
  speed: 10,
  homingForce: 5,
  target: 'enemy',
};

export default class PlayerHomingMissle extends HomingProjectile {
  textureKey: string = 'player-homing-missile';

  stats = PlayerHomingMissleStats;
}
