class Test {
    constructor() {
        this.vectorSetMagTest();
    }
    vectorSetMagTest() {
        let v = new Vector(0, 1);

        if (v.getMag() !== 1) {
            console.error(v.getMag(), "getMag should be 1.4142135623730951!");
        }
        let val = 0.3
        v.setMag(val);
        if (v.getMag() !== val) {
            console.error(v.getMag(), "getMag should be", val);
        }
    }
}