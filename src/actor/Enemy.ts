import InputManager from '../managers/InputManager';
import useStore from '../react/useStore';

const PlayerStats = {
  acceleration: 0.01,
  maxVelocity: 10,
  jumpVelocity: 10,
  dodgeVelocity: 25,
  msBetweenJumps: 250,
  msBetweenDodges: 1000,
  dodgeMs: 250,
};

const rotateArray = (array: number[], amount: number) => {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i += 1) {
    let newIndex = (i - amount) % newArray.length;
    if (newIndex < 0) {
      newIndex += newArray.length;
    }
    newArray[newIndex] = array[i];
  }

  return newArray;
};

export default class Enemy {
  lastJumpTime: number | undefined = undefined;

  lastDodgeTime: number | undefined = undefined;

  sprite: Phaser.Physics.Matter.Sprite;

  colliders: {
    body?: MatterJS.BodyType;
    bottom?: MatterJS.BodyType;
    left?: MatterJS.BodyType;
    right?: MatterJS.BodyType;
  } = {};

  numTouching = {
    body: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  blocked = {
    body: false,
    left: false,
    right: false,
    bottom: false,
  };

  xVelocity = 0;

  hasDoubleJumped = false;

  frames: string[];

  // left, top, right, bottom
  dieNumberNeighbors = {
    6: [2, 4, 5, 3],
    5: [6, 4, 1, 3],
    4: [5, 6, 2, 1],
    3: [2, 6, 5, 4],
    2: [1, 4, 6, 3],
    1: [5, 4, 2, 3],
  };

  currentDieNumber = 6;

  currentDieNeighbors = [2, 4, 5, 3];

  scene: Phaser.Scene;

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('d4', 'assets/sprites/d4.png', 'assets/sprites/d4.json');
  }

  create(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(0, 0, 'd4');
    (this.sprite.body as MatterJS.BodyType).label = 'enemy';
    this.frames = scene.textures.get('d4').getFrameNames();
    this.sprite.setPosition(800, 250);
    this.sprite.setIgnoreGravity(true);
    this.sprite.setFixedRotation();
  }

  update(time: number, delta: number) {
    this.sprite.setVelocityX(0);
    this.sprite.setVelocityY(0);
  }
}
