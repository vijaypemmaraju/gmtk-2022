import Bullet from '../../PlayerProjectiles/Bullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponFourStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 4,
};

export default class WeaponFour extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = Bullet;

  stats = WeaponFourStats;
}
