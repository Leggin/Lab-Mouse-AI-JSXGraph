// based on Code: https://youtu.be/bGz7mv2vD6g from Daniel Shiffman
var xoff = 0;

class DNA {
    constructor(genes) {
        if (genes) {
            this.genes = genes;
        } else {
            this.genes = [];
            for (var i = 0; i < constants.LIFESPAN; i++) {
                this.genes[i] = new Vector(Utilities.map(Utilities.noise(xoff), 0, 1, -1, 1, true), Utilities.map(Utilities.noise(xoff + 1000), 0, 1, 1, -1, true));
                this.genes[i].setMag(constants.MAXFORCE);
                xoff += 0.05;
            }
        }
    }
    // selecting a random breeding function for two genes
    breed(partner) {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                return this.crossover(partner);
            case 1:
                return this.randomCrossover(partner);
            case 2:
                return this.partialSwapCrossover(partner);
        }
    }
    // pairing with partial swap crossover
    partialSwapCrossover(partner) {
        var newgenes = [];
        var mid = Math.floor(Math.random() * this.genes.length);
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[Math.floor(Math.random() * this.genes.length)];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }
    // pairing with normal crossover
    crossover(partner) {
        var newgenes = [];
        var mid = Math.floor(Math.random() * this.genes.length);
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }
    // pairing with random crossover
    randomCrossover(partner) {
        var newgenes = [];
        //var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (0.5 > Math.random()) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }
    // muatation function with mutation rate of 5%
    mutate() {
        for (var i = 0; i < this.genes.length; i++) {
            if (Math.random(1) < 0.05) {
                this.genes[i] = Vector.getRandomVector();
                this.genes[i].setMag(constants.MAXFORCE);
            }
        }
        if (Math.random() < 0.05) {
            for (var i = 0; i < constants.LIFESPAN; i++) {
                this.genes[i] = new Vector(Utilities.map(Utilities.noise(xoff), 0, 1, -1, 1, true), Utilities.map(Utilities.noise(xoff + 1000), 0, 1, 1, -1, true));
                this.genes[i].setMag(constants.MAXFORCE);
                xoff += 0.05;
            }
        }
    }
}
