import createPlayer from "../createPlayer"
import createBoard from "../GameBoard"
export const startGame = (() => {
    
    const player = createPlayer(true);

    const computer = createPlayer(false);
    let attackedPlayer = computer;

    const playerBoard = buildBoard(player.getPlayerID());
    const container = document.querySelector('.container');
    container.append(playerBoard);

    const computerBoard = buildBoard(computer.getPlayerID());
    container.append(playerBoard);

    const changeTurn = () => {
        if(attackedPlayer === player){
            attackedPlayer = computer;
        }else {
            attackedPlayer = player;
        }
    };

    const getAttackedPlayerID = () => {
        return attackedPlayer.getPlayerID;
    };

    const attack = (coordinates) => {
        attackedPlayer.attacked(coordinates);
        changeTurn();
    }

    return {attack, player, computer, getAttackedPlayerID};

    
})();