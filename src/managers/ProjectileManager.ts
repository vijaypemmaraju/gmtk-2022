import Projectile from '../actors/weapons/Projectile';

export default class ProjectileManager {
  static projectiles: Projectile[] = [];

  static addProjectile(projectile: Projectile) {
    ProjectileManager.projectiles.push(projectile);
    projectile.sprite.on('collide', (_a, _b, { bodyA, bodyB }) => {
      if (!bodyA.label.includes('player') && !bodyB.label.includes('player')) {
        projectile.onHit();
        projectile.destroy();
        ProjectileManager.projectiles.splice(
          ProjectileManager.projectiles.indexOf(projectile),
          1,
        );
      }
    });
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
