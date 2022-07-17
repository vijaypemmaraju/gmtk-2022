export default interface Projectile {
  update(time: number, delta: number): void;
  onHit(): void;
}
