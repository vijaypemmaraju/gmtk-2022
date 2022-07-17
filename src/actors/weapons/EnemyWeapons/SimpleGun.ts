import SoundManager from '../../../managers/SoundManager';
import EnemyBullet from '../EnemyProjectiles/EnemyBullet';
import { IProjectile } from '../Projectile';
import Weapon, { WeaponStats } from '../Weapon';

const SimpleGunStats: WeaponStats = {
  msBetweenFires: 150,
};

export default class SimpleGun extends Weapon {
  EquippedProjectileClass: IProjectile = EnemyBullet;

  stats: WeaponStats = SimpleGunStats;

  instantiateProjectiles(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ) {
    const newProjectile = new this.EquippedProjectileClass();
    SoundManager.play('enemy_shoot', Phaser.Math.FloatBetween(0.4, 0.6), 1);
    newProjectile.instantiate(position, aim, scene);
  }
}
