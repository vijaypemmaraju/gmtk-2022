export default class InputManager {
  static cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene) {
    InputManager.cursorKeys = scene.input.keyboard.createCursorKeys();
  }

  static getXAxis(): number {
    let axis = 0;
    if (InputManager.cursorKeys.right.isDown) {
      axis += 1;
    }

    if (InputManager.cursorKeys.left.isDown) {
      axis -= 1;
    }

    return axis;
  }

  static getYAxis(): number {
    return InputManager.cursorKeys.up.isDown ? -1 : 0;
  }

  static getJump(): boolean {
    return InputManager.cursorKeys.space.isDown;
  }

  static getDodge(): boolean {
    return InputManager.cursorKeys.shift.isDown;
  }
}
