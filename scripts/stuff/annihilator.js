const laserBeam = new Effect(30, e => {
  Draw.color(Pal.remove)
  Lines.stroke(5 * e.fout())
  Lines.line(e.x, e.y, e.data.x, e.data.y)
  Lines.stroke(2 * e.fout())
  Draw.color(Color.white)
  Lines.line(e.x, e.y, e.data.x, e.data.y)
});

const laserOrb = new Effect(30, e => {
  Draw.color(Pal.remove)
  Fill.circle(e.x, e.y, e.fout() * e.data.hitSize + 3)
  Draw.color(Color.white)
  Fill.circle(e.x, e.y, e.fout() * e.data.hitSize)
});

const dst = (x1, x2, y1, y2) => {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
};

const annihilator = extend(Block, "annihilator", {
  buildVisibility: BuildVisibility.shown,
  size: 3,
  update: true,
  configurable: true,
  destructible: true,
  solid: true,
  health: 99999
});

annihilator.buildType = () => extend(Building, {
  update(){
    this.super$update();
    Groups.unit.each( u => {
      if(u.team != this.team){
           if( dst(this.x, this.y, u.x, u.y) < 160 * 160 ){
           laserBeam.at(this.x, this.y, 0, u);
           laserOrb.at(u.x, u.y, 0, u);
           u.destroy();
         };
      };
    });
    Groups.build.each( t => {
      if(t.team != this.team){
           if( Mathf.dst(this.x, this.y, t.x, t.y) < 640 ){
           laserBeam.at(this.x, this.y, 0, t);
           t.kill();
         };
      };
    });
  }
});
