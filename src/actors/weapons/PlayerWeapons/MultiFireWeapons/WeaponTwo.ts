import Bullet from '../../PlayerProjectiles/Bullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponTwoStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 2,
};

export default class WeaponTwo extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = Bullet;

  stats = WeaponTwoStats;
}
