import Firework, { FireworkStats } from '../Firework';
import PlayerFireworkShell from './PlayerFireworkShell';

const PlayerFireworkStats: FireworkStats = {
  damage: 0,
  numProjectilesToSpawn: 16,
  ProjectileToSpawn: PlayerFireworkShell,
  speed: 0,
  startSpeed: 15,
  target: 'enemy',
  timeToLiveSeconds: 1,
};

export default class PlayerFirework extends Firework {
  textureKey: string = 'player-bullet';

  stats = PlayerFireworkStats;
}
