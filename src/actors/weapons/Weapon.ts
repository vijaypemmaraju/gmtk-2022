export default interface Weapon {
  canFire(time: number): boolean;
  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void;
}
