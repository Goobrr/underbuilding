const kamion = extendContent(UnitType, "kamion", {
   engineOffset: 5.5,
   speed: 5,
   health: 70,
   flying: true,
   drag: 0.02,
   accel: 0.1,
   localizedName: "kamion"
})
kamion.constructor = () => extend(UnitEntity, {
   killed(){
      //no fall animation because no
      this.dead = true;
      this.health = 0;
      this.destroy();
   }
});

const kamionWeapon = extend(Weapon, {
 reload: 24,
 ejectEffect:Fx.none,
 shootCone: 180,
 shootSound: Sounds.explosion
});

kamionWeapon.bullet = extend(BombBulletType, {
   hitEffect: Fx.pulverize,
   lifetime: 10,
   splashDamageRadius: 70,
   splashDamage: 70,
   killShooter: true,
   hittable: false,
   collidesAir: true
});

kamion.weapons.add(kamionWeapon);
