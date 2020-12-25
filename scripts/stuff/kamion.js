const kamion = extendContent(UnitType, "kamion", {})
kamion.constructor = () => extend(UnitEntity, {
   killed(){
      //no fall animation because no
      this.dead = true;
      this.health = 0;
      this.destroy();
   }
});
kamion.engineOffset = 5.5;
kamion.speed = 5;
kamion.health = 70;
kamion.flying = true;
kamion.drag = 0.02;
kamion.accel = 0.1;

const kamionWeapon = new Weapon();
kamionWeapon.reload = 24;
kamionWeapon.ejectEffect = Fx.none;
kamionWeapon.shootCone = 180;
kamionWeapon.shootSound = Sounds.explosion;
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
