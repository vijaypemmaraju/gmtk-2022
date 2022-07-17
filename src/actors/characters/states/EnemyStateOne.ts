import EnemyController from '../../../controllers/EnemyController';
import Main from '../../../scenes/Main';
import Enemy, { EnemyStats } from '../Enemy';
import EnemyState from './EnemyState';

export default class EnemyStateOne extends EnemyState {
  ttlSeconds: number = 10;

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
    const targetPosition = new Phaser.Math.Vector4(
      800,
      250,
      currentPosition.z,
      currentPosition.w,
    );

    const position = currentPosition.lerp(
      targetPosition,
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
