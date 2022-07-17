import PlayerBullet from '../../../projectiles/PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../../projectiles/Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponOneStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 1,
};

export default class WeaponOne extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponOneStats;
}
