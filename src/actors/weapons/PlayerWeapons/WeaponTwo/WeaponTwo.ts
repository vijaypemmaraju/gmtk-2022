import Weapon from '../../Weapon';
import ProjectileTwo from './ProjectileTwo';

const WeaponTwoStats = {
  msBetweenFires: 50,
};

export default class WeaponTwo implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponTwoStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponTwoStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    for (let i = 0; i < 2; i += 1) {
      const newProjectile = new ProjectileTwo();
      newProjectile.instantiate(
        position.add(
          new Phaser.Math.Vector2(
            Phaser.Math.Between(-10, 10),
            Phaser.Math.Between(-10, 10),
          ),
        ),
        aim,
        scene,
      );
    }
    this.lastFireTime = time;
  }
}
