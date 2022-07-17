import SoundManager from '../../../managers/SoundManager';
import EnemyBullet from '../../projectiles/EnemyProjectiles/EnemyBullet';
import { IProjectile } from '../../projectiles/Projectile';
import SimpleGun from '../SimpleGun';
import { WeaponStats } from '../Weapon';

const EnemySimpleGunStats: WeaponStats = {
  msBetweenFires: 150,
};

export default class EnemySimpleGun extends SimpleGun {
  EquippedProjectileClass: IProjectile = EnemyBullet;

  stats: WeaponStats = EnemySimpleGunStats;

  protected playFireFx(): void {
    SoundManager.play('enemy_shoot', Phaser.Math.FloatBetween(0.4, 0.6), 1);
  }
}
