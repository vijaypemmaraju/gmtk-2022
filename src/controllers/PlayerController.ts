import PlayerCharacter from '../actors/characters/PlayerCharacter';
import Collision from '../actors/Collision';
import InputManager from '../managers/InputManager';
import SoundManager from '../managers/SoundManager';
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

export default class PlayerController {
  lastJumpTime: number | undefined = undefined;

  lastDodgeTime: number | undefined = undefined;

  sprite: Phaser.Physics.Matter.Sprite;

  character: PlayerCharacter;

  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  explosionEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

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

  isDead = false;

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

  currentDieNumber = 1;

  currentDieNeighbors = [5, 4, 2, 3];

  scene: Phaser.Scene;

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'player',
      'assets/sprites/dice.png',
      'assets/sprites/dice.json',
    );
  }

  constructor() {
    this.character = new PlayerCharacter();
  }

  create(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(0, 0, 'player');
    (this.sprite.body as MatterJS.BodyType).label = 'player';
    this.frames = scene.textures.get('player').getFrameNames();
    scene.anims.create({
      key: 'dodge-roll',
      frames: [
        { key: 'player', frame: this.frames[6], duration: 60 },
        { key: 'player', frame: this.frames[7], duration: 60 },
        { key: 'player', frame: this.frames[8], duration: 40 },
        { key: 'player', frame: this.frames[9], duration: 40 },
        { key: 'player', frame: this.frames[10], duration: 50 },
        { key: 'player', frame: this.frames[11], duration: 50 },
      ],
    });
    scene.anims.create({
      key: 'run1',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[12], duration: 60 },
        { key: 'player', frame: this.frames[13], duration: 60 },
        { key: 'player', frame: this.frames[14], duration: 60 },
        { key: 'player', frame: this.frames[15], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'run2',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[16], duration: 60 },
        { key: 'player', frame: this.frames[17], duration: 60 },
        { key: 'player', frame: this.frames[18], duration: 60 },
        { key: 'player', frame: this.frames[19], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'run3',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[20], duration: 60 },
        { key: 'player', frame: this.frames[21], duration: 60 },
        { key: 'player', frame: this.frames[22], duration: 60 },
        { key: 'player', frame: this.frames[23], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'run4',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[24], duration: 60 },
        { key: 'player', frame: this.frames[25], duration: 60 },
        { key: 'player', frame: this.frames[26], duration: 60 },
        { key: 'player', frame: this.frames[27], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'run5',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[28], duration: 60 },
        { key: 'player', frame: this.frames[29], duration: 60 },
        { key: 'player', frame: this.frames[30], duration: 60 },
        { key: 'player', frame: this.frames[31], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'run6',
      repeat: -1,
      frames: [
        { key: 'player', frame: this.frames[32], duration: 60 },
        { key: 'player', frame: this.frames[33], duration: 60 },
        { key: 'player', frame: this.frames[34], duration: 60 },
        { key: 'player', frame: this.frames[35], duration: 60 },
      ],
    });
    scene.anims.create({
      key: 'double-jump',
      frames: [
        { key: 'player', frame: this.frames[36], duration: 60 },
        { key: 'player', frame: this.frames[37], duration: 60 },
        { key: 'player', frame: this.frames[38], duration: 40 },
        { key: 'player', frame: this.frames[39], duration: 40 },
        { key: 'player', frame: this.frames[40], duration: 50 },
        { key: 'player', frame: this.frames[41], duration: 50 },
      ],
    });
    scene.anims.create({
      key: 'wall-slide',
      frames: [{ key: 'player', frame: this.frames[42] }],
    });
    scene.anims.create({
      key: 'idle1',
      frames: [{ key: 'player', frame: this.frames[0] }],
    });
    scene.anims.create({
      key: 'idle2',
      frames: [{ key: 'player', frame: this.frames[1] }],
    });
    scene.anims.create({
      key: 'idle3',
      frames: [{ key: 'player', frame: this.frames[2] }],
    });
    scene.anims.create({
      key: 'idle4',
      frames: [{ key: 'player', frame: this.frames[3] }],
    });
    scene.anims.create({
      key: 'idle5',
      frames: [{ key: 'player', frame: this.frames[4] }],
    });
    scene.anims.create({
      key: 'idle6',
      frames: [{ key: 'player', frame: this.frames[5] }],
    });

    const { width, height } = this.sprite;

    // The player's body is going to be a compound body:
    //  - playerBody is the solid body that will physically interact with the world. It has a
    //    chamfer (rounded edges) to avoid the problem of ghost vertices: http://www.iforce2d.net/b2dtut/ghost-vertices
    //  - Left/right/bottom sensors that will not interact physically but will allow us to check if
    //    the player is standing on solid ground or pushed up against a solid object.

    // Move the sensor to player center
    const sx = width / 2;
    const sy = height / 2;

    this.colliders.body = scene.matter.bodies.rectangle(
      sx,
      sy,
      width / 2,
      height,
      {
        // chamfer: { radius: 10 },
      },
    );
    (this.colliders.body as MatterJS.BodyType).label = 'playerBody';
    this.colliders.bottom = scene.matter.bodies.rectangle(sx, height, sx, 5, {
      isSensor: true,
    });
    (this.colliders.bottom as MatterJS.BodyType).label = 'playerBottom';
    this.colliders.left = scene.matter.bodies.rectangle(
      sx - width * 0.25,
      sy,
      5,
      height * 0.25,
      {
        isSensor: true,
      },
    );
    (this.colliders.left as MatterJS.BodyType).label = 'playerLeft';
    this.colliders.right = scene.matter.bodies.rectangle(
      sx + width * 0.25,
      sy,
      5,
      height * 0.25,
      {
        isSensor: true,
      },
    );
    (this.colliders.right as MatterJS.BodyType).label = 'playerRight';

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
    (compoundBody as MatterJS.BodyType).label = 'playerCompound';

    this.sprite.setExistingBody(compoundBody);
    this.sprite.setCollisionCategory(Collision.COLLISION_CATEGORIES.Player);
    this.sprite.setCollidesWith(Collision.COLLISION_MASKS.Player);
    this.sprite.setFixedRotation();
    this.sprite.setPosition(400, 400);

    this.particles = scene.add.particles('particle', 0);
    const explosionEmitter = this.particles.createEmitter({
      x: this.sprite.x,
      y: this.sprite.y,
      // angle: this.sprite.rotation,
      // speed: { min: -100, max: 100 },
      lifespan: 100,
      quantity: 1,
      scale: { start: 0.5, end: 0 },
      frame: [0, 1, 2, 3],
      blendMode: 'ADD',
      speedY: -10,
      emitZone: {
        type: 'random',
        /* @ts-ignore */
        source: new Phaser.Geom.Circle(0, 0, 4),
      },
      alpha: { start: 1, end: 0 },
    });
    explosionEmitter.stop();
    this.explosionEmitter = explosionEmitter;

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
          if (bodyA.label.includes('enemy') || bodyB.label.includes('enemy')) {
            // launch player away from enemy
            const enemy = bodyA.label === 'enemy' ? bodyA : bodyB;
            const player = bodyA.label === 'enemy' ? bodyB : bodyA;
            const { x: enemyX, y: enemyY } = enemy.position;
            const { x: playerX, y: playerY } = player.position;
            const x = enemyX - playerX;
            this.xVelocity = -Math.sign(x) * 30;
            this.sprite.setVelocityY(0);
          }
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

  playSwitchWeaponSound() {
    SoundManager.play('weapon_switch', 0.1, 1);
  }

  update(time: number, delta: number, scene: Phaser.Scene) {
    // #region Movement
    const isDodging =
      time - (this.lastDodgeTime ?? -PlayerStats.dodgeMs) < PlayerStats.dodgeMs;
    this.character.setInvincibility(isDodging);

    if (this.character.isDead() && !this.isDead) {
      this.isDead = true;
      this.explosionEmitter.explode(100, this.sprite.x, this.sprite.y);
      this.sprite.destroy();
      useStore.setState({ isDead: true });
    }

    if (this.isDead) {
      return;
    }

    const targetVelocity = InputManager.getXAxis() * PlayerStats.maxVelocity;

    this.xVelocity = Phaser.Math.Linear(
      this.xVelocity,
      targetVelocity,
      PlayerStats.acceleration * delta,
    );

    this.sprite.flipX = this.xVelocity < 0;

    this.character.equippedSlot = this.currentDieNumber - 1;

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
        this.playSwitchWeaponSound();
        this.currentDieNeighbors = rotateArray(
          newNeighbors,
          newNeighbors.findIndex(n => n === oldNumber) +
            (direction === 1 ? 0 : -2),
        );
        this.sprite.play('dodge-roll');
        this.sprite.on('animationcomplete', () => {
          if (Math.abs(this.xVelocity) > 0.5) {
            this.sprite.play(`run${this.currentDieNumber}`);
          } else {
            this.sprite.play(`idle${this.currentDieNumber}`);
          }
        });
      }
    }

    const currentAnimation = this.sprite.anims.currentAnim?.key;
    if (
      (this.xVelocity > 0 && !this.blocked.right) ||
      (this.xVelocity < 0 && !this.blocked.left)
    ) {
      this.sprite.setVelocityX(this.xVelocity);
      if (
        this.blocked.bottom &&
        currentAnimation !== 'dodge-roll' &&
        currentAnimation !== 'double-jump' &&
        currentAnimation !== 'wall-slide' &&
        !currentAnimation.includes('run')
      ) {
        this.sprite.play(`run${this.currentDieNumber}`);
      }
    }

    // check if xVelocity is near 0
    if (Math.abs(this.xVelocity) < 0.5 && currentAnimation !== 'double-jump') {
      if (this.blocked.left || this.blocked.right) {
        this.sprite.play(`wall-slide`);
      } else {
        this.sprite.play(`idle${this.currentDieNumber}`);
      }
    }

    let doJump = false;
    if (InputManager.getJump() || InputManager.getJustJumped()) {
      const msSinceJump =
        time - (this.lastJumpTime ?? -PlayerStats.msBetweenJumps);
      const canJump =
        msSinceJump >= PlayerStats.msBetweenJumps &&
        !isDodging &&
        (this.blocked.bottom || this.blocked.left || this.blocked.right);

      const canDoubleJump =
        InputManager.getJustJumped() &&
        !canJump &&
        !this.hasDoubleJumped &&
        !this.blocked.bottom &&
        !this.blocked.left &&
        !this.blocked.right;

      if (this.blocked.bottom || this.blocked.left || this.blocked.right) {
        this.hasDoubleJumped = false;
      }

      if (canJump) {
        doJump = true;
        this.lastJumpTime = time;
        if (this.blocked.left) {
          this.xVelocity = PlayerStats.jumpVelocity;
        } else if (this.blocked.right) {
          this.xVelocity = -PlayerStats.jumpVelocity;
        }
      } else if (canDoubleJump) {
        doJump = true;
        this.hasDoubleJumped = true;
        const newNumber = this.currentDieNeighbors[1];
        const oldNumber = this.currentDieNumber;
        this.currentDieNumber = newNumber;
        const newNeighbors: number[] = this.dieNumberNeighbors[newNumber];
        this.playSwitchWeaponSound();
        this.currentDieNeighbors = rotateArray(
          newNeighbors,
          newNeighbors.findIndex(n => n === oldNumber) + 1,
        );
        this.sprite.play(`double-jump`);
        this.sprite.on('animationcomplete', () => {
          if (Math.abs(this.xVelocity) > 0.5) {
            this.sprite.play(`run${this.currentDieNumber}`);
          } else {
            this.sprite.play(`idle${this.currentDieNumber}`);
          }
        });
      }
    }

    if (doJump) {
      this.sprite.setVelocityY(-PlayerStats.jumpVelocity);
    }

    useStore.setState({
      playerVelocity: [
        this.sprite.body.velocity.x,
        this.sprite.body.velocity.y,
      ],
      blocked: this.blocked,
      currentDieNumber: this.currentDieNumber,
    });
    // #endregion

    // #region Action

    const playerWeapon = this.character.getEquippedWeapon();
    if (InputManager.getFire() && playerWeapon.canFire(time)) {
      const firePosition = new Phaser.Math.Vector2(
        this.sprite.x,
        this.sprite.y,
      );
      const fireDirection = InputManager.getAim()
        .subtract(firePosition)
        .normalize();
      playerWeapon.fire(firePosition, fireDirection, time, scene);
    }

    // #endregion
  }
}
