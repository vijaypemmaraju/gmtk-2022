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

  static getJump(): boolean {
    return InputManager.cursorKeys.space.isDown;
  }

  static getJustJumped(): boolean {
    return Phaser.Input.Keyboard.JustDown(InputManager.cursorKeys.space);
  }

  static getDodge(): boolean {
    return InputManager.cursorKeys.shift.isDown;
  }
}
