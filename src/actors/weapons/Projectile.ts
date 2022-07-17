export default interface Projectile {
  sprite: Phaser.GameObjects.Sprite;
  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  );
  update(time: number, delta: number, scene: Phaser.Scene): void;
  onHit(body: MatterJS.BodyType): void;
  shouldBeDestroyed(): boolean;
  destroy(): void;
}
