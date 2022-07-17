import { IProjectile } from '../projectiles/Projectile';

export type WeaponStats = {
  msBetweenFires: number;
};

export default abstract class Weapon {
  readonly stats: WeaponStats;

  EquippedProjectileClass: IProjectile;

  lastFireTime: number;

  constructor() {
    this.lastFireTime = -Infinity;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= this.stats.msBetweenFires;
  }

  abstract instantiateProjectiles(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  );

  protected playFireFx(): void {}

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    this.instantiateProjectiles(position, aim, time, scene);
    this.playFireFx();
    this.lastFireTime = time;
  }
}
