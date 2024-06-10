import createPlayer from "../createPlayer"
import { buildBoard } from "./board";
import createShip from "../createShip";
export const startGame = () => {
    const player = createPlayer(true, "player1");
    const Board1 = player.getPlayerBoard();
    Board1.placeShip(createShip(3), [2,2], true);
    Board1.placeShip(createShip(4), [5,5], true);

    const computer = createPlayer(false, 'player2');
    const Board2 = computer.getPlayerBoard();
    Board2.placeShip(createShip(3), [2,2], true);
    Board2.placeShip(createShip(4), [5,5], true);

    let attackedPlayer = computer;

    const attack = (coordinates, playerID, e) => {
        if(attackedPlayer === null){
            return;
        }
        if(playerID === attackedPlayer.getPlayerID()){
            if(!attackedPlayer.attacked(coordinates)){
                return;
            }else {
                if(attackedPlayer.getPlayerBoard().containsShip(coordinates)){
                    e.target.classList.add('onShip');
                }else {
                    e.target.classList.add('empty');
                }
            }
            if(attackedPlayer.getPlayerBoard().isLost()){
                const result = document.getElementById('result');
                console.log(attackedPlayer);
                result.innerText = `Game Ended! ${attackedPlayer.getPlayerID()} Lost!`;
                attackedPlayer = null;
                return;
            }

            if(attackedPlayer == player){
                attackedPlayer = computer;
                
            }else {
                attackedPlayer = player;
            }
        }

        

    }

    const playerBoard = buildBoard(player.getPlayerID(), attack);
    const container = document.querySelector('.container');
    container.append(playerBoard);

    const computerBoard = buildBoard(computer.getPlayerID(), attack);
    container.append(computerBoard);

    const getAttackedPlayerID = () => {
        return attackedPlayer.getPlayerID;
    };

    return {attack, player, computer, getAttackedPlayerID};

    
};