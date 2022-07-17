import ProjectileManager from '../../managers/ProjectileManager';
import Projectile from './Projectile';

export default abstract class PlayerProjectile extends Projectile {
  applyDamage(body: MatterJS.BodyType): void {
    if (body.label === 'enemy') {
      ProjectileManager.applyEnemyDamage(this.stats.damage);
    }
  }
}
