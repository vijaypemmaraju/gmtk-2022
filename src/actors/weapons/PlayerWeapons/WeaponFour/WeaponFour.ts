import Weapon from '../../Weapon';
import ProjectileFour from './ProjectileFour';

const WeaponFourStats = {
  msBetweenFires: 50,
};

export default class WeaponFour implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponFourStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponFourStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    for (let i = 0; i < 4; i += 1) {
      const newProjectile = new ProjectileFour();
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
