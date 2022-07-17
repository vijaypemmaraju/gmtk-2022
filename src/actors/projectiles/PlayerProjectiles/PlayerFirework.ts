import Firework, { FireworkStats } from '../Firework';
import PlayerFireworkShell from './PlayerFireworkShell';

const PlayerFireworkStats: FireworkStats = {
  damage: 0,
  numProjectilesToSpawn: 36,
  ProjectileToSpawn: PlayerFireworkShell,
  speed: 0,
  startSpeed: 20,
  target: 'enemy',
  timeToLiveSeconds: 0.4,
};

export default class PlayerFirework extends Firework {
  textureKey: string = 'player-bullet';

  stats = PlayerFireworkStats;
}
