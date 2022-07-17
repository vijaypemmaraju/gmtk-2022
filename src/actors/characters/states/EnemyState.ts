import EnemyController from '../../../controllers/EnemyController';
import Main from '../../../scenes/Main';
import Enemy from '../Enemy';

export default abstract class EnemyState {
  startTime: number = 0;

  onEnter(
    controller: EnemyController,
    character: Enemy,
    time: number,
    delta: number,
    scene: Main,
  ) {
    this.startTime = time;
  }

  abstract update(
    controller: EnemyController,
    character: Enemy,
    time: number,
    delta: number,
    scene: Main,
  );

  onExit(
    controller: EnemyController,
    character: Enemy,
    time: number,
    delta: number,
    scene: Main,
  ) {
    controller.onStateExit(time, delta, scene);
  }
}
