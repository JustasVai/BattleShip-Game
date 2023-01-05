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
            if (checkOverlap(ship, existingShip) || checkTouch(ship, existingShip) ) {
                overlaps = true;
                break;
            }
        }

        if (!overlaps&&!checkOutOfBounds(ship)) {
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

const checkOverlap = (ship1, ship2) => {
    // Check if ship1 and ship2 overlap horizontally
    if (ship1.y === ship2.y) {
        let start1 = ship1.x;
        let end1 = ship1.x + ship1.length - 1;
        let start2 = ship2.x;
        let end2 = ship2.x + ship2.length - 1;

        if ((start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)) {
            return true;
        }
    }

    // Check if ship1 and ship2 overlap vertically
    if (ship1.x === ship2.x) {
        let start1 = ship1.y;
        let end1 = ship1.y + ship1.length - 1;
        let start2 = ship2.y;
        let end2 = ship2.y + ship2.length - 1;

        if ((start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)) {
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