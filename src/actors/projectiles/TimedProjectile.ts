import Projectile, { ProjectileStats } from './Projectile';

export type TimedProjectileStats = ProjectileStats & {
  timeToLiveSeconds: number;
};

export default abstract class TimedProjectile extends Projectile {
  stats: TimedProjectileStats;

  creationTime: number | null = null;

  update(time: number, delta: number, scene: Phaser.Scene): void {
    super.update(time, delta, scene);

    if (this.creationTime === null) {
      this.creationTime = time;
    }
    if (time - this.creationTime >= this.stats.timeToLiveSeconds * 1000) {
      this.explode();
    }
  }
}
