import Projectile, { ProjectileStats } from './Projectile';

export type GrenadeStats = ProjectileStats & {
  startSpeed: number;
  secondsToExplode: number;
  damageRadius: number;
};

export default abstract class Grenade extends Projectile {
  stats: GrenadeStats;

  creationTime: number | null = null;

  explodeOnNextUpdate: boolean = false;

  lastPosition: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

  protected createSprite(
    position: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ): Phaser.Physics.Matter.Sprite {
    const sprite = super.createSprite(position, scene);
    sprite.setIgnoreGravity(false);

    return sprite;
  }

  protected createExplosionEmitter(
    scene: Phaser.Scene,
  ): Phaser.GameObjects.Particles.ParticleEmitter {
    const emitter = super.createExplosionEmitter(scene);

    emitter.emitZone.source = new Phaser.Geom.Circle(
      -this.stats.damageRadius,
      -this.stats.damageRadius,
      this.stats.damageRadius,
    );

    return emitter;
  }

  instantiate(
    position: Phaser.Math.Vector2,
    direction: Phaser.Math.Vector2,
    scene: Phaser.Scene,
  ) {
    super.instantiate(position, direction, scene);
    const blastVelocity = direction.clone().scale(this.stats.startSpeed);
    this.sprite.setVelocity(blastVelocity.x, blastVelocity.y);
    this.explosionCount = 15;
  }

  protected aoeExplode(scene: Phaser.Scene) {
    const hitBodies = scene.matter.intersectRay(
      this.sprite.x - this.stats.damageRadius,
      this.sprite.y - this.stats.damageRadius,
      this.sprite.x + this.stats.damageRadius,
      this.sprite.y + this.stats.damageRadius,
    );
    for (let i = 0; i < hitBodies.length; i += 1) {
      const body = hitBodies[i] as MatterJS.BodyType;
      if (body?.label?.includes(this.stats.target)) {
        this.applyDamage(body);
        break;
      }
    }
    this.explode();
  }

  protected onHit(body: MatterJS.BodyType): void {
    if (body.label.includes(this.stats.target)) {
      this.explodeOnNextUpdate = true;
    }
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
    this.lastPosition = currentPosition;
  }

  update(time: number, delta: number, scene: Phaser.Scene): void {
    super.update(time, delta, scene);

    if (this.creationTime === null) {
      this.creationTime = time;
    }
    if (
      !this.hasExploded &&
      (this.explodeOnNextUpdate ||
        time - this.creationTime >= this.stats.secondsToExplode * 1000)
    ) {
      this.aoeExplode(scene);
    }
  }
}
