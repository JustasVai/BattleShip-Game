const express = require("express");
const app = express();
const ships = require("./generateShips");
const PORT = process.env.PORT || 5000;
const games = [];

const checkHit = (allShips, x, y) => {
    for (let ship of allShips) {
        if (ship.direction === "none") {
            // 1x1 size ship
            if (x === ship.x && y === ship.y) {
                ship.hits++;
                return { hit: true, ship: ship };
            }
        }
        else {
            // 2x1 3x1 4x1 5x1 size 
            if (ship.direction === "left") {
                if (y === ship.y && x <= ship.x && x >= ship.x - ship.length + 1) {
                    ship.hits++;
                    return { hit: true, ship: ship };

                }
            }
            else if (ship.direction === "right") {
                if (y === ship.y && x >= ship.x && x <= ship.x + ship.length - 1) {
                    ship.hits++;
                    return { hit: true, ship: ship };

                }
            }
            else if (ship.direction === "up") {
                if (x === ship.x && y <= ship.y && y >= ship.y - ship.length + 1) {
                    ship.hits++;
                    return { hit: true, ship: ship };
                }
            }
            else {
                if (x === ship.x && y >= ship.y && y <= ship.y + ship.length - 1) {
                    ship.hits++;
                    return { hit: true, ship: ship };
                }

            }
        }
    }
    return { hit: false, ship: "" };
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
    const game = games.find((g) => g.id === request.body.id);
    var ship = checkHit(game.ships, request.body.x, request.body.y);
    var sunk = false;
    if (ship.ship.length === ship.ship.hits) {
        sunk = true;
    }
    response.send({ hit: ship.hit, ship: ship, sunk: sunk });
});

app.get("/reset-ships", (request, response) => {
    const id = Date.now();
    const game = {
        id: id,
        ships: ships.generate(),
    };
    games.push(game);
    response.send({ game});
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));