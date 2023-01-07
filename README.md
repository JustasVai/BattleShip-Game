# Battleship-game Documentation

## About project

Technologies used for the project:

* Front end - **ReactJs**

* Back end - **Javascript** (`Express.js`)
* Node.js version - v19.3.0

Project does not have database. Backend saves games in array. 

## Instructions on launching application

* Clone the git repository
```bash
git clone https://github.com/JustasVai/BattleShip-Game.git
cd BattleShip-Game
```

* Frontend start
```bash
cd Backend
npm install
npm start
```

* Frontend start
```bash
cd Frontend
npm install
npm start
```

* Navigate to http://localhost:3000 to get started!

## Game rules
* The game is played according to the "player against computer" principle.
* The player plays against a program that has placed ships for him/her.

* On a 10x10 board, the ships are placed as follows:

| Ship size  | Ship count |
| :---:      |  :---:     |
| 5x1        | 1          |
| 4x1        | 1          |
| 3x1        | 2          |
| 2x1        | 3          |
| 1x1        | 3          |


* The ships are placed either vertically or horizontally (diagonal placement is not allowed).
* The ships are placed such that there is at least one square of distance between them and any other ship. Ships may not touch each other diagonally.
* A correct example of ship placement is shown below:

![image](https://user-images.githubusercontent.com/67903431/211148641-7ef3f569-aa33-49e7-b3d3-7e6cecc90206.png)
* The player tries to guess which squares the program has "hidden" ships in.
* The player shoots one square at a time, and the program shows whether the player has hit a part of a ship, completely sunk a ship, or missed entirely.
* The player sees which squares have already been shot at, and it is not allowed to shoot at the same square twice.
* The player has 25 shots. If a shot hits a ship, it does not count as one of the 25 shots. If the player's shot is unsuccessful, then one shot is counted as used.
* The player wins the game if all ships are sunk without using all 25 shots.
* The player loses the game if all 25 shots are used and all ships are not sunk.
* At the end of the game, the player can start a new game and the game shows ships that was not hit and sunk.

## Task Implementation

Project has only one Main window.

![image](https://user-images.githubusercontent.com/67903431/211160627-573621b2-89ba-4c56-92fa-33861e9ba46a.png)

* If a shot is taken and misses its target, an alert message appears to inform the shooter that they missed, and the window changes to blue.

![image](https://user-images.githubusercontent.com/67903431/211160643-37e51003-6b1a-4529-b5c0-4e78bf879919.png)

* If a shot is taken and hits its target, an alert message appears to inform the shooter that they hit, and the window display changes to red.

![image](https://user-images.githubusercontent.com/67903431/211160882-e06e7e9e-7ff0-4265-9d66-d051c20f65a2.png)

* If a shot is taken and hits its target and sinks the ship, all ship becomes black. An alert message shows that the ship is sunk.

![image](https://user-images.githubusercontent.com/67903431/211160934-f1e4ba3c-d8e0-4030-85ef-3be525949c9f.png)

* The player loses the game if all 25 shots are used and all ships are not sunk.
The player gets alert that he/she lost and can restart game or press close and see where all the ships were(they are colored red).

![image](https://user-images.githubusercontent.com/67903431/211161008-da34a44e-36f6-4f1e-90be-c78cce584827.png)


<<<<<<< HEAD
=======

>>>>>>> 6ad1ad180d2f39c6acfcf6dafc5a9db783f744cd
