import PlayerBullet from '../../PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponThreeStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 3,
};

export default class WeaponThree extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponThreeStats;
}
