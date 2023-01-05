function generateShips() {
    const ships = [];
    const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const directions = ["up", "down", "left", "right"];

    //generate 1 more 5x1 ship
    while (ships.length < 7) {
        let x = Math.floor(Math.random() * 10 + 1);
        let y = Math.floor(Math.random() * 10 + 1);
        let direction = directions[Math.floor(Math.random() * directions.length)];
        let length = 5;
        let i = letters[x];

        if (ships.length === 1) {
            length = 4;
        }

        else if (ships.length >= 2 && ships.length < 4) {
            length = 3;
        }

        else if (ships.length >= 4) {
            length = 2;
        }
        let hits = 0;
        let coordinates = [];
        let ship = { i, x, y, direction, length, hits, coordinates };
        ship.coordinates = shipToCoordinates(ship);
        // Check if ship overlaps with any existing ships or touches them on all sides
        let overlaps = false;

        for (let existingShip of ships) {

            let contains = checkOverlap(existingShip, ship);
            //console.log(contains);
            if (contains) {
                overlaps = true;
                break;
            }
        }

        if (!overlaps && !checkOutOfBounds(ship)) {
            ships.push(ship);
        }
    }

    //Generate 3 ships 1x1 size
    while (ships.length < 10) {
        let x = Math.floor(Math.random() * 10 + 1);
        let y = Math.floor(Math.random() * 10 + 1);
        let direction = "none"; // 1x1 ships do not have a direction
        let length = 1;
        let i = letters[x];
        let hits = 0;
        let coordinates = [];
        let ship = { i, x, y, direction, length, hits, coordinates };
        ship.coordinates = shipToCoordinates(ship);
        let overlaps = false;

        for (let existingShip of ships) {

            if (checkOverlap(ship, existingShip)) {
                overlaps = true;
                break;
            }
        }

        if (!overlaps) {
            ships.push(ship);
        }
    }


    return ships;
};

function shipToCoordinates(ship) {
    let coordinates = [];

    if (ship.direction === "none") {
        // 1x1 size ship
        coordinates.push({ x: ship.x, y: ship.y });
    } else {
        // 2x1 or 3x1 size ship
        if (ship.direction === "left") {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({ x: ship.x - i, y: ship.y });
            }
        }
        if (ship.direction === "right") {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({ x: ship.x + i, y: ship.y });
            }
        }
        else if (ship.direction === "up") {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({ x: ship.x, y: ship.y - i });
            }
        }
        else if (ship.direction === "down") {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({ x: ship.x, y: ship.y + i });
            }
        }
    }

    return coordinates;
};

function checkOverlap(ship, existingShip) {
    let contains = false;
    for (let coord of shipToCoordinates(existingShip)) {
        for (let coord1 of shipToCoordinates(ship)) {
            const range = Math.sqrt((coord.x - coord1.x) ** 2 + (coord.y - coord1.y) ** 2);
            if (coord.x === coord1.x && coord.y === coord1.y || range <= 1 || Math.abs(coord.x - coord1.x) === 1 && Math.abs(coord.y - coord1.y) === 1) {
                contains = true;
                break;
            }
        }
        if (contains === true) {
            break;
        }
    }
    return contains;
};


function checkOutOfBounds(ship) {
    if (ship.direction === "left") {
        return ship.x - ship.length + 1 <= 0;
    }
    else if (ship.direction === "right") {
        return ship.x + ship.length - 1 >= 10;
    }
    else if (ship.direction === "up") {
        return ship.y - ship.length + 1 <= 0;
    }
    else {
        return ship.y + ship.length - 1 >= 10;
    }
};

module.exports = generateShips();