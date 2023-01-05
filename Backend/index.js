const express = require("express");
const app = express();
const ships = require("./generateShips");
const PORT = process.env.PORT || 5000;

const checkHit = (ships, x, y) => {
    for (let ship of ships) {
      if (x === ship.x && y === ship.y) {
        return true;
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
    response.send({hit:checkHit(ships,request.body.x,request.body.y),ships:ships});
    // response.send({x:request.body.x,y:request.body.y,hit:a});
}); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));