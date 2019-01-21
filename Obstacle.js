
class Obstacle {
    constructor(board, x, y, w, h) {
        this.pos = new Vector(x, y);
        this.height = h;
        this.width = w;
        this.rect = new JSXRect(board, this.pos.x, this.pos.y, this.width, this.height);
    }

    collision(mouse) {
        if (mouse.pos.x > this.pos.x && mouse.pos.x < this.pos.x + this.w && mouse.pos.y < this.pos.y && mouse.pos.y > this.pos.y - this.pos.h) {
            return true;
        }
        return false;
    }


}

