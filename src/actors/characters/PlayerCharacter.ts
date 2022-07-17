import SoundManager from '../../managers/SoundManager';
import useStore from '../../react/useStore';
import WeaponOne from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponOne';
import WeaponThree from '../weapons/PlayerWeapons/MultiFireWeapons/WeaponThree';
import PlayerFireworkLauncher from '../weapons/PlayerWeapons/PlayerFireworkLauncher';
import PlayerGrenadeLauncher from '../weapons/PlayerWeapons/PlayerGrenadeLauncher';
import PlayerMissleLauncher from '../weapons/PlayerWeapons/PlayerMissleLauncher';
import PlayerShotgun from '../weapons/PlayerWeapons/PlayerShotgun';
import Weapon from '../weapons/Weapon';

export const PlayerStats = {
  maxHealth: 6,
};

export default class PlayerCharacter {
  inventory: Weapon[] = [
    new WeaponOne(),
    new PlayerShotgun(),
    new WeaponThree(),
    new PlayerGrenadeLauncher(),
    new PlayerFireworkLauncher(),
    new PlayerMissleLauncher(),
  ];

  equippedSlot = 5;

  health = PlayerStats.maxHealth;

  isInvincible = false;

  wasJustHit = false;

  getEquippedWeapon(): Weapon {
    return this.inventory[this.equippedSlot];
  }

  hit(damage: number): boolean {
    if (this.isInvincible || this.wasJustHit) {
      return false;
    }
    this.health -= damage;
    this.health = Math.max(0, this.health);
    this.wasJustHit = true;
    setTimeout(() => {
      this.wasJustHit = false;
    }, 1000);
    SoundManager.play('hurt', 0.5);

    useStore.setState({
      playerHealth: this.health,
    });

    return true;
  }

  setInvincibility(isInvincible) {
    this.isInvincible = isInvincible;
  }

  isDead(): boolean {
    return this.health <= 0;
  }
}
