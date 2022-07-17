import Weapon from './Weapon';

export default abstract class SimpleGun extends Weapon {
  instantiateProjectiles(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ) {
    const newProjectile = new this.EquippedProjectileClass();
    newProjectile.instantiate(position, aim, scene);
  }
}
