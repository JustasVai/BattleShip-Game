const express = require("express");
const app = express();
const shipsLogic = require("./shipsLogic");
const PORT = process.env.PORT || 5000;
const games = [];


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
    var ship = shipsLogic.checkHit(game.ships, request.body.x, request.body.y);
    response.send({ hit: ship.hit, ship: ship, ships : game.ships });
});

app.get("/reset-ships", (request, response) => {
    const id = Date.now();
    const game = {
        id: id,
        ships: shipsLogic.generate(),
    };

    games.push(game);
    response.send({ game});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));