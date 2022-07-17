import Projectile, { ProjectileStats } from '../Projectile';

const PlayerBulletStats: ProjectileStats = {
  speed: 8,
  damage: 5,
  target: 'enemy',
};

export default class PlayerBullet extends Projectile {
  textureKey: string = 'player-bullet';

  stats = PlayerBulletStats;
}
