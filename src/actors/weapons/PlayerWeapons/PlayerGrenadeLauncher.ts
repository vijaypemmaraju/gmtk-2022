import PlayerGrenade from '../../projectiles/PlayerProjectiles/PlayerGrenade';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const PlayerGrenadeLauncherStats: WeaponStats = {
  msBetweenFires: 1000,
};

export default class PlayerGrenadeLauncher extends SimpleGun {
  EquippedProjectileClass: IProjectile = PlayerGrenade;

  stats = PlayerGrenadeLauncherStats;
}
