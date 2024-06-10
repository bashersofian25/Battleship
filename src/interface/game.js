import createPlayer from "../createPlayer"
import { renderBoard } from "./board";
import createShip from "../createShip";


const placeShipRandomly = (player, length) => {
    const ship = createShip(length);
    const vertical = Math.floor(Math.random() * 10) > 5;
    if(!player.getPlayerBoard().placeShip(ship, [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)], vertical)){
        placeShipRandomly(player, length);
    }
}

export const startGame = (humanPlayer, computerPlayer) => {
    let gameOver = false;

    document.querySelector('.container').innerHTML = '';
    document.querySelector('h1').innerText = "In Progress";

    const player = humanPlayer;
    let Board1 = player.getPlayerBoard();
    placeShipRandomly(player, 4);
    placeShipRandomly(player, 3);
    placeShipRandomly(player, 2);
    placeShipRandomly(player, 4);
    placeShipRandomly(player, 3);
    placeShipRandomly(player, 2);
  

    const computer = computerPlayer;
    let Board2 = computer.getPlayerBoard();
    placeShipRandomly(computer, 4);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 2);
    placeShipRandomly(computer, 4);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 2);

    

    let attackedPlayer = computer;

    const attack = (coordinates) => {
        if(gameOver){
            return;
        }
        if(attackedPlayer != computer){
            return;
        }
        if(!computer.attacked(coordinates)){
            return;
        };
        
        Board1 = renderBoard(player, attack);
        Board2 = renderBoard(computer, attack);
        if(computer.getPlayerBoard().isLost()){
            document.querySelector('h1').innerText = "Game Over";
            gameOver = true;

        }
        const container = document.querySelector('.container');
        container.replaceChildren(Board1, Board2);
        attackedPlayer = player;

        computerAttack();


    }

    const computerAttack = () => {
        if(gameOver){
            return;
        }
        if(attackedPlayer != player){
            return;
        }
        
        if(!player.attacked([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])){
            computerAttack();
        }
        if(player.getPlayerBoard().isLost()){
            document.querySelector('h1').innerText = "Game Over";
            gameOver = true;

        }
        Board1 = renderBoard(player, attack);
        Board2 = renderBoard(computer, attack);
        container.replaceChildren(Board1, Board2);
        attackedPlayer = computer;
    }

    const playerBoard = renderBoard(player, attack);
    const container = document.querySelector('.container');
    container.append(playerBoard);

    const computerBoard = renderBoard(computer, attack);
    container.append(computerBoard);

    const getAttackedPlayerID = () => {
        return attackedPlayer.getPlayerID;
    };

    return {attack, player, computer, getAttackedPlayerID};

    
};