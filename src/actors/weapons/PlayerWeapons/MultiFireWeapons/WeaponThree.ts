import PlayerBullet from '../../../projectiles/PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../../projectiles/Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponThreeStats: MultiFireWeaponStats = {
  msBetweenFires: 1000,
  projectilesPerShot: 3,
};

export default class WeaponThree extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponThreeStats;
}
