import Weapon from '../../Weapon';
import ProjectileSix from './ProjectileSix';

const WeaponSixStats = {
  msBetweenFires: 50,
};

export default class WeaponSix implements Weapon {
  lastFireTime: number;

  constructor() {
    this.lastFireTime = -WeaponSixStats.msBetweenFires;
  }

  canFire(time: number): boolean {
    return time - this.lastFireTime >= WeaponSixStats.msBetweenFires;
  }

  fire(
    position: Phaser.Math.Vector2,
    aim: Phaser.Math.Vector2,
    time: number,
    scene: Phaser.Scene,
  ): void {
    for (let i = 0; i < 4; i += 1) {
      const newProjectile = new ProjectileSix();
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
