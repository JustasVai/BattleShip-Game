# Battleship-game Documentation

## About project

Technologies used for the project:

* Front end - **ReactJs**

* Back end - **Javascript** (`Express.js`)
* Node.js version - v19.3.0

Project does not have database. Backend saves games in array. 

## Instructions on launching application
Clone the git repository
```bash
git clone https://github.com/JustasVai/BattleShip-Game.git
cd BattleShip-Game
```
And install npm dependencies

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
* At the end of the game, the player can start a new game.

