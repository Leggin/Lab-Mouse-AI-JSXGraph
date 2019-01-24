class Mouse {
    constructor(board, x, y, targetPoint) {
        this.board = board;
        this.pos = new Vector(x, y)
        this.dead = false;
        this.dna = new DNA();
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.score = Infinity;
        this.point = board.create('point', [() => { return this.pos.x }, () => { return this.pos.y }], { showInfobox: false, strokeColor: "#555555", fillColor: "#888888", withLabel: false, size: 3 });
        this.targetPoint = targetPoint;
    }

    die() {
        this.dead = true;
    }

    revive() {
        this.dead = false;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update(step) {
        if (!this.dead) {
            this.applyForce(this.dna.genes[step]);
            this.velocity.add(this.acceleration);
            this.velocity.limit(2);
            this.pos.add(this.velocity);
            this.acceleration.mult(0);
            this.calcScore();
        }
    }

    calcScore() {
        let dst = this.pos.distance(new Vector(this.targetPoint.X(), this.targetPoint.Y()));
        this.score = Math.min(this.score, dst);
    }

    collision(obstacle) {
        if (this.pos.x > obstacle.pos.x && this.pos.x < obstacle.pos.x + obstacle.width && this.pos.y < obstacle.pos.y && this.pos.y > obstacle.pos.y - obstacle.height) {
            return true;
        }
        return false;
    }
}