import EnemyHomingMissle from '../../projectiles/EnemyProjectiles/EnemyHomingMissle';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const EnemyMissleLauncherStats: WeaponStats = {
  msBetweenFires: 3000,
};

export default class EnemyMissleLauncher extends SimpleGun {
  EquippedProjectileClass: IProjectile = EnemyHomingMissle;

  stats = EnemyMissleLauncherStats;
}
