import ProjectileManager from '../../managers/ProjectileManager';
import Collision from '../Collision';

export type ProjectileStats = {
  speed: number;
  damage: number;
  target: 'enemy' | 'player';
};

export default abstract class Projectile {
  readonly stats: ProjectileStats;

  readonly textureKey: string;

  direction: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

  sprite: Phaser.Physics.Matter.Sprite;

  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  explosionEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

  hasExploded: boolean = false;

  protected createSprite(
    position: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ): Phaser.Physics.Matter.Sprite {
    const sprite = scene.matter.add.sprite(
      position.x,
      position.y,
      this.textureKey,
      undefined,
      {
        ignoreGravity: true,
      },
    );
    (sprite.body as MatterJS.BodyType).label = 'projectile';
    sprite.setFixedRotation();
    sprite.setCollisionCategory(
      this.stats.target === 'enemy'
        ? Collision.COLLISION_CATEGORIES.PlayerProjectile
        : Collision.COLLISION_CATEGORIES.EnemyProjectile,
    );
    sprite.setCollidesWith(
      this.stats.target === 'enemy'
        ? Collision.COLLISION_MASKS.PlayerProjectile
        : Collision.COLLISION_MASKS.EnemyProjectile,
    );
    return sprite;
  }

  protected createExplosionEmitter(
    scene: Phaser.Scene,
  ): Phaser.GameObjects.Particles.ParticleEmitter {
    this.particles = scene.add.particles('particle', 0);
    const explosionEmitter = this.particles.createEmitter({
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
    explosionEmitter.stop();
    return explosionEmitter;
  }

  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ) {
    this.direction = direction.clone().scale(this.stats.speed);
    this.sprite = this.createSprite(position, scene);
    this.explosionEmitter = this.createExplosionEmitter(scene);
    this.sprite.on('collide', (_a, _b, { bodyA, bodyB }) => {
      this.onHit(bodyA === this.sprite.body ? bodyB : bodyA);
    });
    ProjectileManager.addProjectile(this);
  }

  protected moveProjectile(
    time: number,
    delta: number,
    scene: Phaser.Scene,
  ): void {
    const velocity = this.direction;
    this.sprite.setVelocity(velocity.x, velocity.y);
    this.sprite.rotation = this.direction.angle();
  }

  update(time: number, delta: number, scene: Phaser.Scene): void {
    this.moveProjectile(time, delta, scene);
  }

  protected playExplodeEffects(): void {
    this.explosionEmitter.explode(1, this.sprite.x, this.sprite.y);
  }

  applyDamage(body: MatterJS.BodyType): void {
    if (body.label.includes(this.stats.target)) {
      if (this.stats.target === 'enemy') {
        ProjectileManager.applyEnemyDamage(this.stats.damage);
      } else {
        ProjectileManager.applyPlayerDamage(this.stats.damage);
      }
    }
  }

  protected explode(): void {
    this.playExplodeEffects();
    this.hasExploded = true;
  }

  protected onHit(body: MatterJS.BodyType): void {
    this.applyDamage(body);
    this.explode();
  }

  shouldBeDestroyed(): boolean {
    return (
      this.hasExploded ||
      this.sprite.x < -this.sprite.width ||
      this.sprite.x > 1280 + this.sprite.width ||
      this.sprite.y < -this.sprite.height ||
      this.sprite.y > 720 + this.sprite.height
    );
  }

  destroy(): void {
    this.sprite.destroy();
  }
}

export interface IProjectile {
  new (): Projectile;
}
