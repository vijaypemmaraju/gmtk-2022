import Weapon, { WeaponStats } from './Weapon';

export type ShotgunStats = WeaponStats & {
  numProjectilesPerShot: number;
  spreadAngle: number;
};

export default abstract class Shotgun extends Weapon {
  stats: ShotgunStats;

  instantiateProjectiles(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ) {
    const angleBetweenProjectiles =
      this.stats.spreadAngle / (this.stats.numProjectilesPerShot - 1);
    const startingAngle = -this.stats.spreadAngle / 2;

    for (let i = 0; i < this.stats.numProjectilesPerShot; i += 1) {
      const shotAngle =
        (startingAngle + i * angleBetweenProjectiles) * (Math.PI / 180);
      const shotDirection = new Phaser.Math.Vector2(
        aim.x * Math.cos(shotAngle) - aim.y * Math.sin(shotAngle),
        aim.x * Math.sin(shotAngle) + aim.y * Math.cos(shotAngle),
      );
      const newProjectile = new this.EquippedProjectileClass();
      newProjectile.instantiate(position, shotDirection, scene);
    }
  }
}
