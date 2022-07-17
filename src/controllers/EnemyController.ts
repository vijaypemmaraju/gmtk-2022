import { createMachine, interpret } from 'xstate';
import Enemy from '../actors/characters/Enemy';
import Main from '../scenes/Main';

export default class EnemyController {
  enemy: Enemy;

  currentState: string;

  constructor(enemy: Enemy, scene: Phaser.Scene) {
    this.enemy = enemy;
  }

  onStateExit(time: number, delta: number, scene: Main): void {
    const availableStates = [1];
    if (this.enemy.health <= 750) {
      availableStates.push(2);
    }
    if (this.enemy.health <= 500) {
      availableStates.push(3);
    }
    if (this.enemy.health <= 250) {
      availableStates.push(4);
    }
    const nextStates = availableStates.map(a => a.toString());
    const nextState = nextStates[Phaser.Math.Between(0, nextStates.length - 1)];
    const nextStateInt = parseInt(nextState, 10);
    this.currentState = nextState.toString();
    this.enemy.equippedSlot = nextStateInt - 1;
    if (this.enemy.isAlive() && this.enemy.sprite) {
      this.enemy.sprite.setTexture('d4', this.enemy.frames[nextStateInt - 1]);
    }
    this.enemy.setState(nextState, this, time, delta, scene);
  }

  update(time: number, delta: number, scene: Main): void {
    this.enemy.update(this, time, delta, scene);

    if (this.enemy.isAlive()) {
      const equippedWeapon = this.enemy.getEquippedWeapon();

      if (
        equippedWeapon.canFire(time) &&
        scene.playerController.sprite?.active
      ) {
        const firePosition = new Phaser.Math.Vector2(
          this.enemy.sprite.x,
          this.enemy.sprite.y,
        );
        const playerPosition = new Phaser.Math.Vector2(
          scene.playerController.sprite.x,
          scene.playerController.sprite.y,
        );
        const fireDirection = playerPosition.subtract(firePosition).normalize();
        equippedWeapon.fire(firePosition, fireDirection, time, scene);
      }
    }
  }
}
