import "./style.css";
import { startGame } from "./interface/game";
import createPlayer from "./createPlayer";



const startGameButton = document.querySelector('button');
startGameButton.addEventListener('click', () => {startGame(createPlayer(true, "player1"), createPlayer(false, 'player2'));});


