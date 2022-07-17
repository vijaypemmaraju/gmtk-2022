export default interface Projectile {
  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  );
  update(time: number, delta: number, scene: Phaser.Scene): void;
  onHit(): void;
  shouldBeDestroyed(): boolean;
  destroy(): void;
}
