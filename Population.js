class Population {
    constructor(board, populationSize, targetPoint) {
        this.board = board;
        this.mice = this.generateMice(populationSize, targetPoint);
        this.deadMice = [];
        this.targetPoint = targetPoint;
    }

    resetPosition() {
        this.mice.forEach(mouse => {
            mouse.pos = new Vector(constants.initialMousePosition.x, constants.initialMousePosition.y)
        });
    }

    alldead() {
        for (let i = 0; i < this.mice.length; i++) {
            if (!this.mice[i].dead) {
                return false;
            }
        }
        return true;
    }

    newGeneration() {
        let newPopulation = [];

        let sortedPopulation = this.sortPopulation();
        console.log(this.mice);


        newPopulation = sortedPopulation.splice(0, Math.ceil(sortedPopulation.length * 0.03));
        this.mice = newPopulation.concat(this.breed(newPopulation, sortedPopulation));
        this.mice.forEach(mouse => {
            mouse.dead = false;
            mouse.score = Infinity;
            if (Math.random() < 0.1)
                mouse.dna.mutate();
        });
    }

    breed(topPopulation, bottomPopulation) {
        let newBreed = [];
        bottomPopulation.forEach(mouse => {
            mouse.dna = this.getNewDna(topPopulation, bottomPopulation);
            newBreed.push(mouse);
        });
        return newBreed;
    }

    sortPopulation() {
        return this.mice.sort((a, b) => {
            return a.score - b.score;
        });
    }

    getNewDna(topPopulation, bottomPopulation) {
        if (Math.random() < 0.9) {
            let randomMouseA = this.drawRandomMouse(topPopulation, bottomPopulation);
            let randomMouseB = this.drawRandomMouse(topPopulation, bottomPopulation);
            return randomMouseA.dna.breed(randomMouseB.dna);
        }
        return new DNA();
    }

    drawRandomMouse(topPopulation, bottomPopulation) {
        if (Math.random() < 0.8) {
            return this.getRandomMouse(topPopulation);
        } else {
            return this.getRandomMouse(bottomPopulation)
        }
    }

    getRandomMouse(population) {
        return population[Math.floor(Math.random() * population.length)];
    }

    generateMice(size, targetPoint) {
        let mice = [];
        for (let i = 0; i < size; i++) {
            mice.push(new Mouse(this.board, constants.initialMousePosition.x, constants.initialMousePosition.y, targetPoint));
        }
        return mice;
    }

    // update motion and filter dead mice
    update(step, obstacles) {
        this.mice.forEach(mouse => {
            mouse.update(step);
            obstacles.forEach(obstacle => {
                if (mouse.collision(obstacle)) {
                    mouse.die();
                }
            });
        });
    }

}
