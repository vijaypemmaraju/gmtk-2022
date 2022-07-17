import Weapon, { WeaponStats } from '../../Weapon';

export type MultiFireWeaponStats = WeaponStats & {
  projectilesPerShot: number;
};

export default abstract class MultiFireWeapon extends Weapon {
  stats: MultiFireWeaponStats;

  instantiateProjectiles(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ) {
    for (let i = 0; i < this.stats.projectilesPerShot; i += 1) {
      const newProjectile = new this.EquippedProjectileClass();
      newProjectile.instantiate(
        position.add(
          new Phaser.Math.Vector2(
            Phaser.Math.Between(-10, 10),
            Phaser.Math.Between(-10, 10),
          ),
        ),
        aim,
        scene,
      );
    }
  }
}
