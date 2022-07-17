import PlayerFirework from '../../projectiles/PlayerProjectiles/PlayerFirework';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const PlayerFireworkLauncherStats: WeaponStats = {
  msBetweenFires: 1000,
};

export default class PlayerFireworkLauncher extends SimpleGun {
  EquippedProjectileClass: IProjectile = PlayerFirework;

  stats = PlayerFireworkLauncherStats;
}
