import WeaponFive from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponFive';
import WeaponFour from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponFour';
import WeaponOne from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponOne';
import WeaponSix from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponSix';
import WeaponThree from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponThree';
import WeaponTwo from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponTwo';
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
