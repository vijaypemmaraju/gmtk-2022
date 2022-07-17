import Weapon from '../../Weapon';
import ProjectileThree from './ProjectileThree';

const WeaponThreeStats = {
  msBetweenFires: 50,
};

export default class WeaponThree implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponThreeStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponThreeStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    for (let i = 0; i < 3; i += 1) {
      const newProjectile = new ProjectileThree();
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
