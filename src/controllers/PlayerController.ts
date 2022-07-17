import InputManager from '../managers/InputManager';

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

export default class PlayerController {
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

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'player',
      'assets/sprites/dice.png',
      'assets/sprites/dice.json',
    );
  }

  create(scene: Phaser.Scene) {
    this.sprite = scene.matter.add.sprite(0, 0, 'player', 6);
    this.frames = scene.textures.get('player').getFrameNames();
    const { width, height } = this.sprite;

    // The player's body is going to be a compound body:
    //  - playerBody is the solid body that will physically interact with the world. It has a
    //    chamfer (rounded edges) to avoid the problem of ghost vertices: http://www.iforce2d.net/b2dtut/ghost-vertices
    //  - Left/right/bottom sensors that will not interact physically but will allow us to check if
    //    the player is standing on solid ground or pushed up against a solid object.

    // Move the sensor to player center
    const sx = width / 2;
    const sy = height / 2;

    this.colliders.body = scene.matter.bodies.rectangle(sx, sy, width, height, {
      // chamfer: { radius: 10 },
    });
    this.colliders.bottom = scene.matter.bodies.rectangle(sx, height, sx, 5, {
      isSensor: true,
    });
    this.colliders.left = scene.matter.bodies.rectangle(
      sx - width * 0.45,
      sy,
      5,
      height * 0.25,
      {
        isSensor: true,
      },
    );
    this.colliders.right = scene.matter.bodies.rectangle(
      sx + width * 0.45,
      sy,
      5,
      height * 0.25,
      {
        isSensor: true,
      },
    );

    const compoundBody = scene.matter.body.create({
      parts: [
        this.colliders.body,
        this.colliders.bottom,
        this.colliders.left,
        this.colliders.right,
      ],
      restitution: 0.05, // Prevent body from sticking against a wall
      friction: 0.01,
    });

    this.sprite.setExistingBody(compoundBody);
    this.sprite.setFixedRotation();
    this.sprite.setPosition(400, 400);

    scene.matter.world.on('beforeupdate', event => {
      this.numTouching.left = 0;
      this.numTouching.right = 0;
      this.numTouching.bottom = 0;
    });

    scene.matter.world.on('collisionactive', event => {
      const playerBody = this.colliders.body;
      const { left } = this.colliders;
      const { right } = this.colliders;
      const { bottom } = this.colliders;

      for (let i = 0; i < event.pairs.length; i += 1) {
        const { bodyA } = event.pairs[i];
        const { bodyB } = event.pairs[i];

        if (bodyA === playerBody || bodyB === playerBody) {
          continue;
        } else if (bodyA === bottom || bodyB === bottom) {
          // Standing on any surface counts (e.g. jumping off of a non-static crate).
          this.numTouching.bottom += 1;
        } else if (
          (bodyA === left && bodyB.isStatic) ||
          (bodyB === left && bodyA.isStatic)
        ) {
          // Only static objects count since we don't want to be blocked by an object that we
          // can push around.
          this.numTouching.left += 1;
        } else if (
          (bodyA === right && bodyB.isStatic) ||
          (bodyB === right && bodyA.isStatic)
        ) {
          this.numTouching.right += 1;
        }
      }
    });

    scene.matter.world.on('afterupdate', event => {
      this.blocked.right = this.numTouching.right > 0;
      this.blocked.left = this.numTouching.left > 0;
      this.blocked.bottom = this.numTouching.bottom > 0;
    });
  }

  update(time: number, delta: number) {
    this.sprite.setTexture('player', `dieRed${this.currentDieNumber}`);
    const isDodging =
      time - (this.lastDodgeTime ?? -PlayerStats.dodgeMs) < PlayerStats.dodgeMs;

    // Update movement
    const targetVelocity = InputManager.getXAxis() * PlayerStats.maxVelocity;

    this.xVelocity = Phaser.Math.Linear(
      this.xVelocity,
      targetVelocity,
      PlayerStats.acceleration * delta,
    );

    if (InputManager.getDodge()) {
      if (!isDodging) {
        this.lastDodgeTime = time;
        const direction = Math.sign(this.xVelocity);
        this.xVelocity = direction * PlayerStats.dodgeVelocity;
        let newNumber;
        if (direction === 1) {
          // eslint-disable-next-line prefer-destructuring
          newNumber = this.currentDieNeighbors[2];
        } else if (direction === -1) {
          // eslint-disable-next-line prefer-destructuring
          newNumber = this.currentDieNeighbors[0];
        }
        const oldNumber = this.currentDieNumber;
        this.currentDieNumber = newNumber;
        const newNeighbors = this.dieNumberNeighbors[newNumber];
        this.currentDieNeighbors = rotateArray(
          newNeighbors,
          newNeighbors.findIndex(n => n === oldNumber) +
            (direction === 1 ? 0 : -2),
        );
      }
    }

    if (
      (this.xVelocity > 0 && !this.blocked.right) ||
      (this.xVelocity < 0 && !this.blocked.left)
    ) {
      this.sprite.setVelocityX(this.xVelocity);
    }

    if (InputManager.getJump()) {
      const msSinceJump =
        time - (this.lastJumpTime ?? -PlayerStats.msBetweenJumps);
      if (msSinceJump >= PlayerStats.msBetweenJumps) {
        let didJump = false;
        if (this.blocked.bottom) {
          this.sprite.setVelocityY(-PlayerStats.jumpVelocity);
          didJump = true;
        } else if (this.blocked.left) {
          // Jump up and away from the wall
          this.sprite.setVelocityY(-PlayerStats.jumpVelocity);
          this.sprite.setVelocityX(PlayerStats.jumpVelocity);
          didJump = true;
        } else if (this.blocked.right) {
          // Jump up and away from the wall
          this.sprite.setVelocityY(-PlayerStats.jumpVelocity);
          this.sprite.setVelocityX(-PlayerStats.jumpVelocity);
          didJump = true;
        }
        if (didJump) {
          this.lastJumpTime = time;
          const newNumber = this.currentDieNeighbors[1];
          const oldNumber = this.currentDieNumber;
          this.currentDieNumber = newNumber;
          const newNeighbors: number[] = this.dieNumberNeighbors[newNumber];
          this.currentDieNeighbors = rotateArray(
            newNeighbors,
            newNeighbors.findIndex(n => n === oldNumber) + 1,
          );
        }
      }
    }
  }
}
