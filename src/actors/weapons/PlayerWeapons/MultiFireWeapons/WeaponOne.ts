import Bullet from '../../PlayerProjectiles/Bullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponOneStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 1,
};

export default class WeaponOne extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = Bullet;

  stats = WeaponOneStats;
}
