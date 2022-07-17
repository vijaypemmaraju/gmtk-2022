import { IProjectile } from './Projectile';
import TimedProjectile, { TimedProjectileStats } from './TimedProjectile';

export type SpawnProjectileStats = TimedProjectileStats & {
  numProjectilesToSpawn: number;
  ProjectileToSpawn: IProjectile;
};

export default class SpawnProjectile extends TimedProjectile {
  stats: SpawnProjectileStats;

  lastPosition: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

  hasSpawned: boolean = false;

  update(time: number, delta: number, scene: Phaser.Scene): void {
    super.update(time, delta, scene);

    if (this.hasExploded && !this.hasSpawned) {
      const reachedTtl =
        time - (this.creationTime as number) >=
        this.stats.timeToLiveSeconds * 1000;

      // Only spawn on non-accidental explosions
      if (reachedTtl) {
        const spawnPosition = new Phaser.Math.Vector2(
          this.sprite.x,
          this.sprite.y,
        );

        const angleBetweenProjectiles =
          (2 * Math.PI) / this.stats.numProjectilesToSpawn;
        const projectileDirection = new Phaser.Math.Vector2(
          this.sprite.x,
          this.sprite.y,
        )
          .subtract(this.lastPosition)
          .normalize();

        for (let i = 0; i < this.stats.numProjectilesToSpawn; i += 1) {
          const shotAngle = i * angleBetweenProjectiles;
          const shotDirection = new Phaser.Math.Vector2(
            projectileDirection.x * Math.cos(shotAngle) -
              projectileDirection.y * Math.sin(shotAngle),
            projectileDirection.x * Math.sin(shotAngle) +
              projectileDirection.y * Math.cos(shotAngle),
          );
          const newProjectile = new this.stats.ProjectileToSpawn();
          newProjectile.instantiate(spawnPosition, shotDirection, scene);
        }
      }

      this.hasSpawned = true;
    }

    this.lastPosition = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
  }
}
