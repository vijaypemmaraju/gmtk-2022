import InputManager from '../managers/InputManager';

const PlayerStats = {
  acceleration: 0.01,
  maxVelocity: 10,
  jumpVelocity: 10,
  dodgeVelocity: 50,
  msBetweenJumps: 250,
  msBetweenDodges: 1000,
  dodgeMs: 250,
};

export default class PlayerController {
  lastJumpTime: number | undefined = undefined;

  lastDodgeTime: number | undefined = undefined;

  dodgeAim: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;

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

  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet('player', 'assets/sprites/dice.png', {
      frameWidth: 64,
      frameHeight: 64,
      spacing: 2,
      margin: 2,
    });
  }

  create(scene: Phaser.Scene) {
    this.sprite = scene.matter.add.sprite(0, 0, 'player', 0);
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
    const isDodging =
      time - (this.lastDodgeTime ?? -PlayerStats.dodgeMs) < PlayerStats.dodgeMs;

    // Update movement
    const canMove = !isDodging;
    if (canMove) {
      const targetVelocity = InputManager.getXAxis() * PlayerStats.maxVelocity;

      this.xVelocity = Phaser.Math.Linear(
        this.xVelocity,
        targetVelocity,
        PlayerStats.acceleration * delta,
      );
    }

    let doJump = false;
    if (InputManager.getJump()) {
      const msSinceJump =
        time - (this.lastJumpTime ?? -PlayerStats.msBetweenJumps);
      const canJump =
        msSinceJump >= PlayerStats.msBetweenJumps &&
        !isDodging &&
        (this.blocked.bottom || this.blocked.left || this.blocked.right);

      if (canJump) {
        doJump = true;
        this.lastJumpTime = time;
        if (this.blocked.left) {
          this.xVelocity = PlayerStats.jumpVelocity;
        } else if (this.blocked.right) {
          this.xVelocity = -PlayerStats.jumpVelocity;
        }
      }
    }

    if (InputManager.getDodge()) {
      const canDodge =
        time >=
        (this.lastDodgeTime ?? -PlayerStats.msBetweenDodges) +
          PlayerStats.msBetweenDodges;
      if (canDodge) {
        this.lastDodgeTime = time;
        this.dodgeAim = new Phaser.Math.Vector2(
          InputManager.getXAxis(),
          InputManager.getYAxis(),
        );
        if (this.dodgeAim.lengthSq() === 0) {
          this.dodgeAim = new Phaser.Math.Vector2(1, 0);
        }
      }
    }

    if (isDodging) {
      const d = (time - (this.lastDodgeTime as number)) / PlayerStats.dodgeMs;
      const dodgeStart = this.dodgeAim
        .normalize()
        .scale(PlayerStats.dodgeVelocity);
      const dodgeEnd = Phaser.Math.Vector2.ZERO;
      // ease-out cubic @see {@link: https://easings.net/#easeOutCubic}
      const t = 1 - (1 - d) ** 3;
      const easedDodgeVelocity = dodgeStart.lerp(dodgeEnd, t);
      this.xVelocity = easedDodgeVelocity.x;
      this.sprite.setVelocityY(easedDodgeVelocity.y);
    }

    if (
      (this.xVelocity > 0 && !this.blocked.right) ||
      (this.xVelocity < 0 && !this.blocked.left)
    ) {
      this.sprite.setVelocityX(this.xVelocity);
    }

    if (doJump) {
      this.sprite.setVelocityY(-PlayerStats.jumpVelocity);
    }
  }
}
