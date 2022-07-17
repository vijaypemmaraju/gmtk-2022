import TimedProjectile, { TimedProjectileStats } from '../TimedProjectile';

const PlayerFireworkShellStats: TimedProjectileStats = {
  damage: 2,
  speed: 10,
  target: 'enemy',
  timeToLiveSeconds: 0.5,
};

export default class PlayerFireworkShell extends TimedProjectile {
  textureKey: string = 'player-bullet';

  stats = PlayerFireworkShellStats;
}
