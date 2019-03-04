const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

const perlin_octaves = 4; // default to medium smooth
const perlin_amp_falloff = 0.5; // 50% reduction/octave

var scaled_cosine = function (i) {
    return 0.5 * (1.0 - Math.cos(i * Math.PI));
};

var perlin; // will be initialized lazily by noise() or noiseSeed()

class Utilities {
    static noise(x, y, z) {
        y = y || 0;
        z = z || 0;

        if (perlin == null) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
                perlin[i] = Math.random();
            }
        }

        if (x < 0) {
            x = -x;
        }
        if (y < 0) {
            y = -y;
        }
        if (z < 0) {
            z = -z;
        }

        var xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
        var xf = x - xi;
        var yf = y - yi;
        var zf = z - zi;
        var rxf, ryf;

        var r = 0;
        var ampl = 0.5;

        var n1, n2, n3;

        for (var o = 0; o < perlin_octaves; o++) {
            var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

            rxf = scaled_cosine(xf);
            ryf = scaled_cosine(yf);

            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
            n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);

            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
            n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);

            n1 += scaled_cosine(zf) * (n2 - n1);

            r += n1 * ampl;
            ampl *= perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;

            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
            if (zf >= 1.0) {
                zi++;
                zf--;
            }
        }
        return r;
    }

    static map(n, start1, stop1, start2, stop2, withinBounds) {
        var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    }

    static constrain(val, lower, upper) {
        if (val < lower) {
            return lower;
        }
        if (val > upper) {
            return upper;
        }
        return val;
    }

    static createVector(x, y) {
        return { x: x, y: y };
    }

    static calcObstacle(coordsA, coordsB) {
        let x1 = coordsA[0];
        let y1 = coordsA[1];

        let x2 = coordsB[0];
        let y2 = coordsB[1];

        if (x1 > x2) {
            let tmpx = x1;
            x1 = x2;
            x2 = tmpx;
        }

        if (y1 < y2) {
            let tmpy = y1;
            y1 = y2;
            y2 = tmpy;
        }



        let w = Math.abs(x2 - x1);
        let h = Math.abs(y2 - y1);

        return [x1, y1, w, h];
    }

    static coordsSimilar(a, b) {

        if (Math.abs(a[0] - b[0]) < 5 && Math.abs(a[0] - b[0]) < 5) {
            return true;
        }
        return false;
    }


}