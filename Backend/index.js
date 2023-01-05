const express = require("express");
const app = express();
const ships = require("./generateShips");
const PORT = process.env.PORT || 5000;

const checkHit = (ships, x, y) => {
    for (let ship of ships) {
        if (ship.direction === "none") {
            // 1x1 size ship
            if (x === ship.x && y === ship.y) {
                return true;
            }
        }
        else {
            // 2x1 3x1 4x1 5x1 size 
            if (ship.direction === "left") {
                if (y === ship.y && x <= ship.x && x >= ship.x - ship.length + 1) {
                    return true;
                }
            }
            else if (ship.direction === "right") {
                if (y === ship.y && x >= ship.x && x <= ship.x + ship.length - 1) {
                    return true;
                }
            } //x = 2 y = 5 shot x = 2 y = 3 
            else if (ship.direction === "up") { 
                if (x === ship.x && y <= ship.y && y >= ship.y - ship.length + 1) {
                    return true;
                }
            }
            else {
                if (x === ship.x && y >= ship.y && y <= ship.y + ship.length - 1) {
                    return true;
                }

            }
        }
    }
    return false;
};

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/", (request, response) => {
    var a = Math.random() < 0.5;
    console.log(request.body);
    response.send({ hit: checkHit(ships, request.body.x, request.body.y), ships: ships });
    // response.send({x:request.body.x,y:request.body.y,hit:a});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));