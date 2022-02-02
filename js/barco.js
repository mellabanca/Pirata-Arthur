class Barco {
    constructor(x, y, l, a, barcoPos){
        this.body = Bodies.rectangle(x, y, l, a);
        this.l = l;
        this.a = a;
        this.barcoPosicao = barcoPos;
        this.image = loadImage("./assets/boat.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.barcoPosicao, this.l, this.a);
        pop();
    }
}