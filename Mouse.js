class Mouse {
    constructor(board, x, y, dna = new DNA()) {
        this.board = board;
        this.pos = new Vector(x, y)
        this.dead = false;
        this.dna = dna;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.score = 0;
        this.point = board.create('point', [() => { return this.pos.x }, () => { return this.pos.y }], { strokeColor: "#555555", fillColor: "#888888", withLabel: false, size: 3 });
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
            this.score++;
        }
    }

    collision(obstacle) {
        if (this.pos.x > obstacle.pos.x && this.pos.x < obstacle.pos.x + obstacle.width && this.pos.y < obstacle.pos.y && this.pos.y > obstacle.pos.y - obstacle.height) {
            return true;
        }
        return false;
    }
}