import ProjectileManager from '../../managers/ProjectileManager';
import Projectile from './Projectile';

export default abstract class PlayerProjectile extends Projectile {
  applyDamage(body: MatterJS.BodyType): void {
    if (body.label === 'player') {
      ProjectileManager.applyPlayerDamage(this.stats.damage);
    }
  }
}
