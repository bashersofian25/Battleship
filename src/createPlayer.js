const createBoard = require('./GameBoard');

const createPlayer = (isHuman) => {
    const playerBoard = createBoard();
    const isPlayerHuman = () => {return isHuman;};
    const attacked = (coordinates) => {
        return playerBoard.receiveAttack(coordinates);
    };
    const getPlayerBoard = () => {return playerBoard;};

    const attack = (opponent, coordinates) => {
        return opponent.attacked(coordinates);
    };

    return {isPlayerHuman, attacked, getPlayerBoard, attack};
};

module.exports = createPlayer;