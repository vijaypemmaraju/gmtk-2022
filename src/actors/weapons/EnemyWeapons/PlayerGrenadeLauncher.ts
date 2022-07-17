import EnemyGrenade from '../../projectiles/EnemyProjectiles/EnemyGrenade';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const EnemyGrenadeLauncherStats: WeaponStats = {
  msBetweenFires: 5000,
};

export default class EnemyGrenadeLauncher extends SimpleGun {
  EquippedProjectileClass: IProjectile = EnemyGrenade;

  stats = EnemyGrenadeLauncherStats;
}
