import ProjectileManager from '../../../../managers/ProjectileManager';
import Projectile from '../../Projectile';

const ProjectileOneStats = {
  speed: 5,
};

export default class ProjectileOne implements Projectile {
  direction: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

  sprite: Phaser.Physics.Matter.Sprite;

  static preload(scene: Phaser.Scene) {
    scene.load.image('projectile-one', 'assets/textures/bullet.png');
  }

  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ) {
    this.direction = direction.clone().scale(ProjectileOneStats.speed);

    this.sprite = scene.matter.add.sprite(
      position.x,
      position.y,
      'projectile-one',
      undefined,
      {
        ignoreGravity: true,
        collisionFilter: {
          mask: 0,
        },
      },
    );

    ProjectileManager.addProjectile(this);
  }

  update(): void {
    const velocity = this.direction;
    this.sprite.setVelocity(velocity.x, velocity.y);
  }

  onHit(): void {}

  destroy(): void {
    this.sprite.destroy();
  }

  shouldBeDestroyed(): boolean {
    return (
      this.sprite.x < -this.sprite.width ||
      this.sprite.x > 1280 + this.sprite.width ||
      this.sprite.y < -this.sprite.height ||
      this.sprite.y > 720 + this.sprite.height
    );
  }
}
