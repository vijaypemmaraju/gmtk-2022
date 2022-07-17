import WeaponFive from '../weapons/PlayerWeapons/WeaponFive/WeaponFive';
import WeaponFour from '../weapons/PlayerWeapons/WeaponFour/WeaponFour';
import WeaponOne from '../weapons/PlayerWeapons/WeaponOne/WeaponOne';
import WeaponSix from '../weapons/PlayerWeapons/WeaponSix/WeaponSix';
import WeaponThree from '../weapons/PlayerWeapons/WeaponThree/WeaponThree';
import WeaponTwo from '../weapons/PlayerWeapons/WeaponTwo/WeaponTwo';
import Weapon from '../weapons/Weapon';

export default class PlayerCharacter {
  inventory: Weapon[] = [
    new WeaponOne(),
    new WeaponTwo(),
    new WeaponThree(),
    new WeaponFour(),
    new WeaponFive(),
    new WeaponSix(),
  ];

  equippedSlot = 5;

  getEquippedWeapon(): Weapon {
    return this.inventory[this.equippedSlot];
  }
}
