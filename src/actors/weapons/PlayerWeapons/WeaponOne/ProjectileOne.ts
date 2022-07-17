import ProjectileManager from '../../../../managers/ProjectileManager';
import Projectile from '../../Projectile';

const ProjectileOneStats = {
  speed: 5,
};

export default class ProjectileOne implements Projectile {
  direction: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

  sprite: Phaser.Physics.Matter.Sprite;

  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  static preload(scene: Phaser.Scene) {
    scene.load.image('projectile-one', 'assets/sprites/bullet.png');
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
      },
    );
    (this.sprite.body as MatterJS.BodyType).label = 'projectile';

    ProjectileManager.addProjectile(this, scene);

    this.particles = scene.add.particles('particle', 0);
    this.emitter = this.particles.createEmitter({
      x: this.sprite.x,
      y: this.sprite.y,
      // angle: this.sprite.rotation,
      // speed: { min: -100, max: 100 },
      lifespan: 100,
      quantity: 1,
      scale: { start: 0.5, end: 0 },
      frame: [0, 1, 2, 3],
      blendMode: 'ADD',
      speedY: -10,
      emitZone: {
        type: 'random',
        /* @ts-ignore */
        source: new Phaser.Geom.Circle(0, 0, 4),
      },
      alpha: { start: 1, end: 0 },
    });
    this.emitter.stop();
  }

  update(): void {
    const velocity = this.direction;
    this.sprite.setVelocity(velocity.x, velocity.y);
  }

  onHit(): void {
    this.explode();
  }

  explode(): void {
    this.emitter.explode(1, this.sprite.x, this.sprite.y);
  }

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
