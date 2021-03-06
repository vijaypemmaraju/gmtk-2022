import Main from '../../scenes/Main';
import Projectile, { ProjectileStats } from './Projectile';

export type HomingProjectileStats = ProjectileStats & {
  homingForce: number;
};

export default abstract class HomingProjectile extends Projectile {
  stats: HomingProjectileStats;

  getTargetCharacter(scene: Main): Phaser.Physics.Matter.Sprite {
    return this.stats.target === 'enemy'
      ? scene.enemyController.enemy.sprite
      : scene.playerController.sprite;
  }

  protected moveProjectile(
    time: number,
    delta: number,
    scene: Phaser.Scene,
  ): void {
    super.moveProjectile(time, delta, scene);

    const target = this.getTargetCharacter(scene as Main);
    if (target.body) {
      const targetDirection = new Phaser.Math.Vector2(target.x, target.y)
        .subtract(new Phaser.Math.Vector2(this.sprite.x, this.sprite.y))
        .normalize();
      this.direction = this.direction.lerp(
        targetDirection,
        this.stats.homingForce * (delta / 1000),
      );
    }
  }
}
