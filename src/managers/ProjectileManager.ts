import Projectile from '../actors/weapons/Projectile';

export default class ProjectileManager {
  static projectiles: Projectile[] = [];

  static addProjectile(projectile: Projectile) {
    ProjectileManager.projectiles.push(projectile);
  }

  update(time: number, delta: number, scene: Phaser.Scene) {
    for (let i = ProjectileManager.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = ProjectileManager.projectiles[i];
      projectile.update(time, delta, scene);
      if (projectile.shouldBeDestroyed()) {
        projectile.destroy();
        ProjectileManager.projectiles.splice(i, 1);
      }
    }
  }
}
