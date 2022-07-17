import PlayerBullet from '../../../projectiles/PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../../projectiles/Projectile';
import MultiFireWeapon, { MultiFireWeaponStats } from './MultiFireWeapon';

const WeaponTwoStats: MultiFireWeaponStats = {
  msBetweenFires: 50,
  projectilesPerShot: 2,
};

export default class WeaponTwo extends MultiFireWeapon {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = WeaponTwoStats;
}
