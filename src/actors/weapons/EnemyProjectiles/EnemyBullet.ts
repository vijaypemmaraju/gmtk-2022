import Projectile, { ProjectileStats } from '../Projectile';

const EnemyBulletStats: ProjectileStats = {
  speed: 8,
  damage: 1,
  target: 'player',
};

export default class EnemyBullet extends Projectile {
  textureKey: string = 'enemy-bullet';

  stats = EnemyBulletStats;
}
