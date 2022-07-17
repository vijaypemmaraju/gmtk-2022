import SpawnProjectile, { SpawnProjectileStats } from './SpawnProjectile';

export type FireworkStats = SpawnProjectileStats & {
  startSpeed: number;
};

export default abstract class Firework extends SpawnProjectile {
  stats: FireworkStats;

  protected createSprite(
    position: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ): Phaser.Physics.Matter.Sprite {
    const sprite = super.createSprite(position, scene);
    sprite.setIgnoreGravity(false);

    return sprite;
  }

  protected moveProjectile(): void {
    const currentPosition: Phaser.Math.Vector2 = new Phaser.Math.Vector2(
      this.sprite.x,
      this.sprite.y,
    );
    const dirAngle = this.lastPosition
      .subtract(currentPosition)
      .normalize()
      .rotate(Math.PI)
      .angle();
    this.sprite.setRotation(dirAngle);
  }

  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ) {
    super.instantiate(position, direction, scene);
    const blastVelocity = direction.clone().scale(this.stats.startSpeed);
    this.sprite.setVelocity(blastVelocity.x, blastVelocity.y);
  }
}
