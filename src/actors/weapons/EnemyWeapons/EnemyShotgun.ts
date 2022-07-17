import EnemyBullet from '../../projectiles/EnemyProjectiles/EnemyBullet';
import { IProjectile } from '../../projectiles/Projectile';
import Shotgun, { ShotgunStats } from '../Shotgun';

const EnemyShotgunStats: ShotgunStats = {
  msBetweenFires: 1500,
  numProjectilesPerShot: 10,
  spreadAngle: 60,
};

export default class EnemyShotgun extends Shotgun {
  EquippedProjectileClass: IProjectile = EnemyBullet;

  stats = EnemyShotgunStats;
}
