import EnemyController from '../../../controllers/EnemyController';
import Main from '../../../scenes/Main';
import Enemy, { EnemyStats } from '../Enemy';
import EnemyState from './EnemyState';

export default class EnemyStateThree extends EnemyState {
  ttlSeconds: number = 8;

  spline: Phaser.Curves.Spline = new Phaser.Curves.Spline([
    new Phaser.Math.Vector2(200, 600),
    new Phaser.Math.Vector2(200, 250),
    new Phaser.Math.Vector2(1052, 600),
    new Phaser.Math.Vector2(1052, 250),
    new Phaser.Math.Vector2(200, 600),
  ]);

  periodSeconds: number = 4;

  periodStart: number = 0;

  onEnter(
    controller: EnemyController,
    character: Enemy,
    time: number,
    delta: number,
    scene: Main,
  ) {
    super.onEnter(controller, character, time, delta, scene);
    this.periodStart = time;
  }

  update(
    controller: EnemyController,
    character: Enemy,
    time: number,
    delta: number,
    scene: Main,
  ) {
    const currentPosition = new Phaser.Math.Vector4(
      character.sprite.x,
      character.sprite.y,
      character.sprite.z,
      character.sprite.w,
    );

    const t =
      ((time - this.periodStart) % (this.periodSeconds * 1000)) /
      (this.periodSeconds * 1000);
    const targetPosition = this.spline.getPoint(t);

    const position = currentPosition.lerp(
      new Phaser.Math.Vector4(
        targetPosition.x,
        targetPosition.y,
        currentPosition.z,
        currentPosition.w,
      ),
      (delta / 1000) * EnemyStats.speed,
    );
    character.sprite.setPosition(
      position.x,
      position.y,
      position.z,
      position.w,
    );

    if (time - this.startTime > this.ttlSeconds * 1000) {
      this.onExit(controller, character, time, delta, scene);
    }
  }
}
