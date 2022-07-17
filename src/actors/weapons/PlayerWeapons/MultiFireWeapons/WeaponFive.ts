import PlayerBullet from '../../PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponFiveStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 5,
};

export default class WeaponFive extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponFiveStats;
}
