class Boid{
    constructor(){
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(1,1.11))
        this.acceleration = createVector()
        this.maxForce = .1
        this.maxVelocity = 3
        this.perception = 50;
    }

    edges(){
        if(this.position.x > width){
            this.position.x = 0
        }
        else if(this.position.x < 0){
            this.position.x = width
        }
        if(this.position.y > height){
            this.position.y = 0
        }
        else if(this.position.y < 0){
            this.position.y = height

        }
    }

    align(boids){
        let steering = createVector();
        let total = 0
        for (let other of boids){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if(other != this && distance < perceptionSlider.value()){
                steering.add(other.velocity)
                total++
            }
        }
        if (total > 0){
            // desired here is pointing toward the average position of all the boids
            steering.div(total)
            // steering = desired - current
            steering.sub(this.velocity)
            // limit the force to a certain maximum value on the object
            steering.limit(this.maxForce)
        }
        return steering
    }

    cohere(boids){
        let steering = createVector();
        let total = 0
        for (let other of boids){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if(other != this && distance < perceptionSlider.value()){
                steering.add(other.position)
                total++
            }
        }
        if (total > 0){
            steering.div(total)
            steering.sub(this.position)
            steering.limit(this.maxForce)
        }
        return steering
    }

    separate(boids){
        let steering = createVector();
        let total = 0;
        for (let other of boids){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if (other != this && distance < perceptionSlider.value() / 2){
                let to_other = createVector(this.position.x - other.position.x, this.position.y - other.position.y)
                to_other.div(distance*distance)
                steering.add(to_other)
                total++;
            }
        }

        return steering.mult(5)
    }

    flock(boids){
        let steering_sum = createVector()
        let steering_align = this.align(boids)
        let steering_cohere = this.cohere(boids)
        let steering_separate = this.separate(boids)

        steering_align.mult(alignSlider.value());
        steering_cohere.mult(cohereSlider.value());
        steering_separate.mult(separateSlider.value());

        steering_sum.add(steering_align);
        steering_sum.add(steering_cohere);
        steering_sum.add(steering_separate);
        this.acceleration.add(steering_sum)


    }

    update(){
        this.velocity.add(this.acceleration)
        this.velocity.setMag(this.maxVelocity)
        this.position.add(this.velocity)
        this.acceleration.setMag(0)
    }

    show(){
        point(this.position.x, this.position.y)
    }
}
    
