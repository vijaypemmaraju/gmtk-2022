import PlayerProjectile from '../PlayerProjectile';
import { ProjectileStats } from '../Projectile';

const BulletStats: ProjectileStats = {
  speed: 8,
  damage: 5,
};

export default class Bullet extends PlayerProjectile {
  textureKey: string = 'bullet';

  stats = BulletStats;
}
