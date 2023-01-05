const generateShips = () => {
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

        let ship = { i, x, y, direction, length };

        // Check if ship overlaps with any existing ships or touches them on all sides
        let overlaps = false;
    
        for (let existingShip of ships) {
            let contains = false;
            for (let coord of shipToCoordinates(existingShip)) {
                for (let coord1 of shipToCoordinates(ship)) {
                    if (coord.x === coord1.x && coord.y === coord1.y) {
                        contains = true;
                        break;
                    }
                }
                if(contains===true)
                {
                    break;
                }
            }
            if (contains || checkTouch(ship, existingShip)) {
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
        let ship = { i, x, y, direction, length };

        let overlaps = false;

        for (let existingShip of ships) {
            if (checkOverlap(ship, existingShip) || checkTouch(ship, existingShip)) {
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

const shipToCoordinates = (ship) => {
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

const checkOverlap = (ship, existingShip) => {

    if (existingShip.direction === "none") {
        if (existingShip.x === ship.x && existingShip.y === ship.y) {
            return true;
        }
    }


    return false;
};

const checkTouch = (ship1, ship2) => {
    // Check if ship1 and ship2 touch horizontally
    if (ship1.y === ship2.y) {
        let start1 = ship1.x;
        let end1 = ship1.x + ship1.length - 1;
        let start2 = ship2.x;
        let end2 = ship2.x + ship2.length - 1;

        if (start1 === end2 + 1 || end1 === start2 - 1) {
            return true;
        }
    }
    // Check if ship1 and ship2 touch vertically
    if (ship1.x === ship2.x) {
        let start1 = ship1.y;
        let end1 = ship1.y + ship1.length - 1;
        let start2 = ship2.y;
        let end2 = ship2.y + ship2.length - 1;

        if (start1 === end2 + 1 || end1 === start2 - 1) {
            return true;
        }
    }

    if (Math.abs(ship1.x - ship2.x) === 1 && Math.abs(ship1.y - ship2.y) === 1) {
        return true;
    }

    return false;

};

const checkOutOfBounds = (ship) => {
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