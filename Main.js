class Simulation {
    constructor() {
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-500, 500, 500, -500], keepaspectratio: true, axis: false, showNavigation: false, showCopyright: false, });
        this.mice = [];
        this.generateMice(constants.POPULATION_SIZE);
        this.obstacles = [];
        this.buildObstacles();
        this.animationPoint = this.board.create('point', [-1, 1], { visible: false });
        this.animate = this.animate.bind(this);
        this.animationStep = 0;
    }

    buildObstacles() {
        this.obstacles.push(new Obstacle(this.board, -147, 193, 160, 50));
    }

    generateMice(size) {
        for (let i = 0; i < size; i++) {
            this.mice.push(new Mouse(this.board, 0, 0));
        }
    }

    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    animate() {
        if (this.animationStep < constants.LIFESPAN) {
            this.mice.forEach(mouse => {
                mouse.update(this.animationStep);
                this.obstacles.forEach(obstacle => {
                    if (mouse.collision(obstacle)) {
                        mouse.die();
                    }
                });
            });

        } else {
            this.resetSimulation();
        }
        this.animationStep++;

        //return something so the animation never stops!
        return [-1, 1];
    }

    resetSimulation() {

    }
}

let s = new Simulation();
s.start();