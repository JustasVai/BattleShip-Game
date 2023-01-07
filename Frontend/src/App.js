import './App.css';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BattleGrid from './components/Grid';
import PlayerInfo from './components/PlayerInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

function App() {

  const [id, setId] = React.useState(null);
  const fetchData = async () => {
    await fetch('http://localhost:5000/reset-ships')
      .then((res) => res.json())
      .then((data) => {
        setId(data.game.id);
      }).catch((err) => {
        console.log(err.message);
      });
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  const createGridMap = () => {
    const grid = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ]
    const map = [];
    for (let i = 0; i < grid.length; i++) {
      map.push([]);
      for (let j = 0; j < grid[i].length; j++) {
        map[i].push({
          value: grid[i][j],
          color: 'white',
        });
      }
    }
    return map;
  };

  const sunkTheShip = (grid, ship) => {
    for (let i = 0; i < ship.ship.coordinates.length; i++) {
      var x = ship.ship.coordinates[i].x - 1;
      var y = ship.ship.coordinates[i].y - 1;
      grid[y][x].color = "rgba(0 ,0,0,0.85)";
    }
  }

  const notSunkShips = (grid,ships) => {
    for (let i = 0; i < ships.length; i++) {
        if(!ships[i].sunk)
        {
          console.log(ships[i]);
          for (let j = 0; j < ships[i].coordinates.length; j++) {
            var x = ships[i].coordinates[j].x - 1;
            var y = ships[i].coordinates[j].y - 1;
            grid[y][x].color = "rgba(128 ,0,0,0.85)";
          }
        }
    }
  }

  const [playerGrid, setPlayerGrid] = useState(createGridMap());
  const [shots, setShots] = useState(25);
  const [isShow, invokeModal] = useState(false);
  const [won, setWon] = useState("Lost");
  const [shipsDestroyed, setDestroyed] = useState(1);
  const [ships, setShips] = useState();
  //console.log(ships);
  const initModal = () => {
    return invokeModal(!isShow)
  }

  const restartGame = () => {
    window.location.reload(false);
  };

  const handleClick = async (i, j) => {

    const newGrid = [...playerGrid];
    if (shots > 0 && won !== "Won") {
      if (playerGrid[i][j].value === 'X') {
        toast('This window has already been shot');
      }
      else {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            x: j + 1,
            y: i + 1,
            id: id
          }),
        };

        const response = await fetch('http://localhost:5000/', requestOptions);

        const data = await response.json();
        setShips(data.ships);
        newGrid[i][j].value = 'X';
        if (data.hit) {
          toast('You hit the ship');
          newGrid[i][j].color = "rgba(220 ,20,60,0.85)";
          if (data.ship.ship.sunk) {
            toast('You sunk the ship');
            sunkTheShip(newGrid, data.ship);
            setDestroyed(shipsDestroyed + 1);
            if (shipsDestroyed === 10) {
              initModal();
              setWon("Won");
            }
          }
        }

        else {
          toast('You missed');
          setShots(shots - 1);
          newGrid[i][j].color = "rgba(6 ,151,156,0.85)";
        }
        setPlayerGrid(newGrid);
      }

    }
    else if (won === "Won") {
      initModal();
      setWon("Won");
    }
    else {
      notSunkShips(playerGrid,ships);
      initModal();
      setWon("Lost");
    }
  };

  return (
    <div className='App-header'>
      <header>
        <h1>Battleship game</h1>
        <ToastContainer position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </header>
      <div className='background'></div>
      <div className='player'>
        <BattleGrid className='grids' grid={playerGrid} handleClick={handleClick} />
        <PlayerInfo shots={shots}></PlayerInfo>

        <Modal show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>You {won}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You {won} the game.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button variant="dark" onClick={() => { initModal(); restartGame(); }}>
              Restart game
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}

export default App;
