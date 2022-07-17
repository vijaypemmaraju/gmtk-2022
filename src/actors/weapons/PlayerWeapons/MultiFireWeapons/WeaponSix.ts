import PlayerBullet from '../../../projectiles/PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../../projectiles/Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponSixStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 6,
};

export default class WeaponSix extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponSixStats;
}
