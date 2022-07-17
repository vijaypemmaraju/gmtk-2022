export default class SoundManager {
  static sounds: { [key: string]: Phaser.Sound.BaseSound } = {};

  static SOUND_NAMES = ['shoot', 'enemy_shoot', 'explosion', 'weapon_switch'];

  static preload(scene: Phaser.Scene) {
    SoundManager.SOUND_NAMES.forEach(sound => {
      scene.load.audio(sound, `assets/sfx/${sound}.wav`);
    });
  }

  static load(scene: Phaser.Scene) {
    SoundManager.SOUND_NAMES.forEach(sound => {
      this.sounds[sound] = scene.sound.add(sound);
    });
  }

  static play(sound: string, volume = 1, variance: number = 0.1) {
    const detune = Phaser.Math.FloatBetween(-variance * 100, variance * 100);
    this.sounds[sound].play({
      volume,
      detune,
    });
  }
}
