const generateShips = () => {
    const ships = [];
    const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    while (ships.length < 5) {
        let x = Math.floor(Math.random() * 10+1);
        let y = Math.floor(Math.random() * 10+1);
        let direction = "none"; // 1x1 ships do not have a direction
        let length = 1;
        let i = letters[x];
        let ship = {i, x, y, direction, length};

        let overlaps = false;
        for (let existingShip of ships) {
            if(checkOverlap(ship, existingShip)) {
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
module.exports = generateShips();