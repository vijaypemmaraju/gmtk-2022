import { createMachine, interpret } from 'xstate';
import Enemy from '../actor/Enemy';

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = createMachine({
  id: 'toggle',
  initial: '1',
  states: {
    1: { on: { 2: '2', 3: '3', 4: '4' } },
    2: { on: { 1: '1', 3: '3', 4: '4' } },
    3: { on: { 1: '1', 2: '2', 4: '4' } },
    4: { on: { 1: '1', 2: '2', 3: '3' } },
  },
});

export default class EnemyController {
  enemy: Enemy;

  currentState: string;

  constructor(enemy: Enemy, scene: Phaser.Scene) {
    this.enemy = enemy;
    // Machine instance with internal state
    const toggleService = interpret(toggleMachine)
      .onTransition(state => {
        this.currentState = state.value.toString();
      })
      .start();
    // => 'inactive'

    setInterval(() => {
      const nextStates = [1, 2, 3, 4]
        .map(a => a.toString())
        .filter(a => a !== this.currentState);
      const nextState =
        nextStates[Phaser.Math.Between(0, nextStates.length - 1)];
      toggleService.send(nextState);
      if (this.enemy.sprite) {
        this.enemy.sprite.setTexture(
          'd4',
          this.enemy.frames[parseInt(nextState, 10) - 1],
        );
      }
    }, 1000);
  }

  update(time: number, delta: number): void {
    this.enemy.update(time, delta);

    if (this.currentState === '4') {
      const newX = this.enemy.sprite.x + Phaser.Math.Between(-5, 5);
      const newY = this.enemy.sprite.y + Phaser.Math.Between(-5, 5);

      const newVelocity = {
        x: newX - this.enemy.sprite.x,
        y: newY - this.enemy.sprite.y,
      };
      this.enemy.sprite.setVelocity(newVelocity.x, newVelocity.y);
    }
  }
}
