import InputManager from '../managers/InputManager';

const PlayerStats = {
  acceleration: 10,
  maxVelocity: 10,
};

export default class PlayerController {
  sprite = null;

  colliders = {
    body: null,
    bottom: null,
    left: null,
    right: null,
  };

  velocity = new Phaser.Math.Vector2(0, 0);

  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet('player', 'assets/sprites/dice.png', {
      frameWidth: 68,
      frameHeight: 68,
    });
  }

  create(scene: Phaser.Scene) {
    this.sprite = scene.physics.add.sprite(0, 0, 'player', 0);
    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const { width, height } = this.sprite;

    matter.bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
    playerController.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, {
      isSensor: true,
    });
    playerController.sensors.left = M.Bodies.rectangle(
      sx - w * 0.45,
      sy,
      5,
      h * 0.25,
      { isSensor: true },
    );
    playerController.sensors.right = M.Bodies.rectangle(
      sx + w * 0.45,
      sy,
      5,
      h * 0.25,
      { isSensor: true },
    );
  }

  update(time: number, delta: number) {
    // Update movement
    const targetVelocity = new Phaser.Math.Vector2(
      InputManager.getXAxis() * PlayerStats.maxVelocity,
      0,
    );

    this.velocity = this.velocity.lerp(
      targetVelocity,
      PlayerStats.acceleration * delta,
    );
  }
}
