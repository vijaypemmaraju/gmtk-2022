import WeaponOne from '../weapons/PlayerWeapons/WeaponOne/WeaponOne';
import Weapon from '../weapons/Weapon';

export default class PlayerCharacter {
  inventory: Weapon[] = [new WeaponOne()];

  equippedSlot = 0;

  getEquippedWeapon(): Weapon {
    return this.inventory[this.equippedSlot];
  }
}
