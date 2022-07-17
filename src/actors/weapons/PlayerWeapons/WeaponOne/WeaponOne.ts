import Weapon from '../../Weapon';
import ProjectileOne from './ProjectileOne';

const WeaponOneStats = {
  msBetweenFires: 50,
};

export default class WeaponOne implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponOneStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponOneStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    const newProjectile = new ProjectileOne();
    newProjectile.instantiate(position, aim, scene);
    this.lastFireTime = time;
  }
}
