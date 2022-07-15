import Phaser from 'phaser';
import './react/Root';
import Main from './scenes/Main';
import UI from './scenes/UI';

// eslint-disable-next-line import/no-mutable-exports
let game: Phaser.Game | null = null;

game = new Phaser.Game({
  type: Phaser.WEBGL,
  backgroundColor: '#125555',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Main, UI],
  pixelArt: true,
});

export default game;
