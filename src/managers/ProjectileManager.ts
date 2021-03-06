import Projectile from '../actors/projectiles/Projectile';
import Main from '../scenes/Main';

export default class ProjectileManager {
  static scene: Main;

  static projectiles: Projectile[] = [];

  constructor(scene: Main) {
    ProjectileManager.scene = scene;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('player-bullet', 'assets/textures/player-bullet.png');
    scene.load.image('player-grenade', 'assets/textures/player-grenade.png');
    scene.load.image(
      'player-homing-missile',
      'assets/textures/player-homing-missile.png',
    );
    scene.load.image('enemy-bullet', 'assets/textures/enemy-bullet.png');
  }

  static addProjectile(projectile: Projectile) {
    ProjectileManager.projectiles.push(projectile);
  }

  static applyEnemyDamage(damage: number) {
    ProjectileManager.scene.enemyController.enemy.hit(damage);
    // ProjectileManager.scene.cameras.main.shake(50, 0.0025, false);
  }

  static applyPlayerDamage(damage: number) {
    const wasHit =
      ProjectileManager.scene.playerController.character.hit(damage);
    if (wasHit) {
      ProjectileManager.scene.cameras.main.shake(50, 0.0025, false);
    }
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
