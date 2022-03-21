class CannonBall {
    constructor(x,y){
        
        var options = {
            isStatic: true,
            restitution: 0.1,
            frictionAir: 0.02
             }

        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        console.log(this.body);
        this.image = loadImage("./assets/cannonball.png");
        this.ponto=[];
        World.add(world,this.body);
        this.speed = 0.05;
        this.animation = [this.image];
        this.afundando = false;
    }

    remove(index) {
        this.afundando = true;
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    
        this.animation = aguaAnimation;
        this.speed = 0.05;
        this.r = 150;
        setTimeout(() => {
          Matter.World.remove(world, this.body);
          delete balls[index];
        }, 1000);
      }

    animate(){
        this.speed += 0.05;
      } 

    shoot(){
        var newAngle = cannon.angle - 28;
        newAngle = newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)});
    }

    display(){
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push();
        imageMode(CENTER);
        image(this.animation[index], pos.x, pos.y, this.r, this.r);
        pop();
        
        if(this.body.velocity.x > 0 && pos.x > 10 && !this.afundando){
            var position = [pos.x, pos.y];
            this.ponto.push(position);
        }

        for(var i = 0; i < this.ponto.length; i++){
            image(this.image, this.ponto[i][0], this.ponto[i][1], 5,5); 
        }
    }

}