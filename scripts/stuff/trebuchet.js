const trebuchetBullet = extend(ArtilleryBulletType, {   
  despawned(b){
    let x = Mathf.round(b.x) / 8;
    let y = Mathf.round(b.y) / 8;
    let t = Vars.world.tile(x, y)
    // Decide whether to place a router or not
    // TODO: find a better way to do this shit
    if(t !== null){
      if( t.block() == Blocks.air ){
        t.setBlock(Blocks.router, b.owner.team);
      }else{
        Fx.blockExplosion.at(b.x, b.y);
      };
    }else{
      Fx.blockExplosion.at(b.x, b.y);
    };
    this.super$despawned(b);
  },
        
  draw(b){
    Draw.rect("router", b.x, b.y, (360 * 2) * b.fin());
  },
        
  width: 16,
  height: 16,
  speed: 4,
  hitSound: Sounds.place,
  despawnEffect: Fx.none,
  trailEffect: Fx.none
});

// Might rename later
const trebuchet = extend(ItemTurret, "trebuchet", {
  inaccuracy: 7.5,
  size: 3,
  reloadTime: 20,
  range: 200,
  buildVisibility: BuildVisibility.shown,
  shootSound: Sounds.artillery
});
trebuchet.ammo(Items.silicon, trebuchetBullet);
