import Weapon from '../Weapon';

export default class WeaponOne implements Weapon {
  canFire(): boolean {
    return true;
  }

  fire(): void {}
}
