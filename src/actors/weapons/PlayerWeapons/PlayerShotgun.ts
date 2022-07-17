import PlayerBullet from '../../projectiles/PlayerProjectiles/PlayerBullet';
import { IProjectile } from '../../projectiles/Projectile';
import Shotgun, { ShotgunStats } from '../Shotgun';

const PlayerShotgunStats: ShotgunStats = {
  msBetweenFires: 500,
  numProjectilesPerShot: 6,
  spreadAngle: 35,
};

export default class PlayerShotgun extends Shotgun {
  EquippedProjectileClass: IProjectile = PlayerBullet;

  stats = PlayerShotgunStats;
}
