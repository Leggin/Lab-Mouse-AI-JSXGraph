class Simulation {
    constructor() {
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-500, 500, 500, -500], keepaspectratio: true, axis: false, showNavigation: false, showCopyright: false, });
        this.obstacles = [];
        this.buildObstacles();
        this.animationPoint = this.board.create('point', [-1, 1], { visible: false });
        this.targetPoint = this.board.create('point', constants.targetPointCoords, { face: "cross", label: "target", visible: true, color: "#222222" });
        this.targetPoint.setLabelText("Target")
        this.population = new Population(this.board, constants.POPULATION_SIZE, this.targetPoint);
        this.animate = this.animate.bind(this);
        this.animationStep = 0;
        this.board.on("down", this.onMouseDown.bind(this));
        this.firstClick = { flag: true };
        let test = new Test();
    }

    onMouseDown(e) {

        let coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e), this.board);

        if (!Utilities.coordsSimilar([coords.scrCoords[1], coords.scrCoords[2]], [this.targetPoint.coords.scrCoords[1], this.targetPoint.coords.scrCoords[2]])) {

            if (this.firstClick.flag == true) {
                this.firstClick.value = [coords.usrCoords[1], coords.usrCoords[2]];
                this.firstClick.flag = false;

            } else {
                let blockValues = Utilities.calcObstacle(this.firstClick.value, [coords.usrCoords[1], coords.usrCoords[2]]);
                this.obstacles.push(new Obstacle(this.board, blockValues[0], blockValues[1], blockValues[2], blockValues[3]));
                this.firstClick = { flag: true };
            }
        }
    }

    buildObstacles() {
        this.obstacles.push(new Obstacle(this.board, -147, 193, 160, 50));
        this.obstacles.push(new Obstacle(this.board, 30, 193, 50, 160));

    }
    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    animate() {
        if (this.animationStep < constants.LIFESPAN && !this.population.alldead()) {
            this.population.update(this.animationStep, this.obstacles);
        } else {
            this.population.newGeneration();
            this.population.resetPosition();
            this.animationStep = 0;
        }
        this.animationStep++;

        //return something so the animation never stops!
        return [-1, 1];
    }
}

let s = new Simulation();
s.start();