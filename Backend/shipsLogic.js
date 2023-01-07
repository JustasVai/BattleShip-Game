function generateShips() {
    const ships = [];
    const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const directions = ["up", "down", "left", "right"];

    //generates 1-5x1, 1-4x1, 2-3x1, 3-2x1, 3-1x1 ships
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
        let sunk = false;
        let coordinates = [];
        let ship = { i, x, y, direction, length, hits, coordinates ,sunk};
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
        let sunk = false;
        let ship = { i, x, y, direction, length, hits, coordinates,sunk };
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

//Function to get coordinates from ship objects
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

//Function to check if ships are overlaping
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

//Function to check if ship is out of bounds
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
const checkSunk = (ship) =>{
    if(ship.hits===ship.length)
    {
        ship.sunk = true;
    }
}
//Function to check if shot hit ship
const checkHit = (allShips, x, y) => {
    for (let ship of allShips) {
        if (ship.direction === "none") {
            // 1x1 size ship
            if (x === ship.x && y === ship.y) {
                ship.hits++;
                checkSunk(ship);
                return { hit: true, ship: ship };
            }
        }
        else {
            // 2x1 3x1 4x1 5x1 size 
            if (ship.direction === "left") {
                if (y === ship.y && x <= ship.x && x >= ship.x - ship.length + 1) {
                    ship.hits++;
                    checkSunk(ship);
                    return { hit: true, ship: ship };

                }
            }
            else if (ship.direction === "right") {
                if (y === ship.y && x >= ship.x && x <= ship.x + ship.length - 1) {
                    ship.hits++;
                    checkSunk(ship);
                    return { hit: true, ship: ship };

                }
            }
            else if (ship.direction === "up") {
                if (x === ship.x && y <= ship.y && y >= ship.y - ship.length + 1) {
                    ship.hits++;
                    checkSunk(ship);
                    return { hit: true, ship: ship };
                }
            }
            else {
                if (x === ship.x && y >= ship.y && y <= ship.y + ship.length - 1) {
                    ship.hits++;
                    checkSunk(ship);
                    return { hit: true, ship: ship };
                }

            }
        }
    }
    return { hit: false, ship: "" };
};

exports.generate =generateShips;
exports.checkHit = checkHit;