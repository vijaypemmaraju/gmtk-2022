import Bullet from '../../PlayerProjectiles/Bullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponSixStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 6,
};

export default class WeaponSix extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = Bullet;

  stats = WeaponSixStats;
}
