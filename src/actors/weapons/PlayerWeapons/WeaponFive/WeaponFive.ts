import Weapon from '../../Weapon';
import ProjectileFive from './ProjectileFive';

const WeaponFiveStats = {
  msBetweenFires: 50,
};

export default class WeaponFive implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponFiveStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponFiveStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    for (let i = 0; i < 4; i += 1) {
      const newProjectile = new ProjectileFive();
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
