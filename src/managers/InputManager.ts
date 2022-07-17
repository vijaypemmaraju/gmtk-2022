const InputConfig = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  upAlt: Phaser.Input.Keyboard.KeyCodes.UP,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  rightAlt: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  leftAlt: Phaser.Input.Keyboard.KeyCodes.LEFT,
  jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
  jumpAlt: Phaser.Input.Keyboard.KeyCodes.W,
  jumpAlt2: Phaser.Input.Keyboard.KeyCodes.UP,
  dodge: Phaser.Input.Keyboard.KeyCodes.SHIFT,
};

type InputKeys = {
  [key in keyof typeof InputConfig]: Phaser.Input.Keyboard.Key;
};
export default class InputManager {
  static keys: InputKeys;

  static pointer: Phaser.Input.Pointer;

  static sceneInput: Phaser.Input.InputPlugin;

  constructor(scene: Phaser.Scene) {
    InputManager.keys = scene.input.keyboard.addKeys(
      InputConfig,
      true,
    ) as InputKeys;
    InputManager.pointer = scene.input.activePointer;
  }

  static getXAxis(): number {
    let axis = 0;
    if (InputManager.keys.right.isDown || InputManager.keys.rightAlt.isDown) {
      axis += 1;
    }

    if (InputManager.keys.left.isDown || InputManager.keys.leftAlt.isDown) {
      axis -= 1;
    }

    return axis;
  }

  static getJump(): boolean {
    return (
      InputManager.keys.jump.isDown ||
      InputManager.keys.jumpAlt.isDown ||
      InputManager.keys.jumpAlt2.isDown
    );
  }

  static getJustJumped(): boolean {
    return (
      Phaser.Input.Keyboard.JustDown(InputManager.keys.jump) ||
      Phaser.Input.Keyboard.JustDown(InputManager.keys.jumpAlt) ||
      Phaser.Input.Keyboard.JustDown(InputManager.keys.jumpAlt2)
    );
  }

  static getDodge(): boolean {
    return InputManager.keys.dodge.isDown;
  }

  static getFire(): boolean {
    return InputManager.pointer.leftButtonDown();
  }

  static getAim(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      InputManager.pointer.worldX,
      InputManager.pointer.worldY,
    );
  }
}
