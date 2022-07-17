import PlayerHomingMissle from '../../projectiles/PlayerProjectiles/PlayerHomingMissle';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const PlayerMissleLauncherStats: WeaponStats = {
  msBetweenFires: 1000,
};

export default class PlayerMissleLauncher extends SimpleGun {
  EquippedProjectileClass: IProjectile = PlayerHomingMissle;

  stats = PlayerMissleLauncherStats;
}
