const createBoard = require('./GameBoard');

const createPlayer = (isHuman, playerID) => {
    const myPlayerID = playerID;
    const playerBoard = createBoard();
    const isPlayerHuman = () => {return isHuman;};
    const attacked = (coordinates) => {
        return playerBoard.receiveAttack(coordinates);
    };
    const getPlayerBoard = () => {return playerBoard;};

    const attack = (opponent, coordinates) => {
        return opponent.attacked(coordinates);
    };
    const getPlayerID = () => {
        return myPlayerID;
    }

    return {isPlayerHuman, attacked, getPlayerBoard, attack, getPlayerID};
};

module.exports = createPlayer;