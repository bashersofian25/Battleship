const square = () => {
    let hit = false;
    let squareShip = null;
    

    const applyAttack = () => {
        shipOnSquare().hit();
    };
    const hitSquare = () => {
        if(!hit){
            hit = true;
            if(squareShip !== null) {
                applyAttack();
            }
            return true;
        }else {
            return false;
        }
    };
    const isSquareHit = () => {
        return hit;
    };

    const shipOnSquare = () => {
        return squareShip;
    };

    const setShipOnSquare = (ship) => {
        squareShip =  ship;
    };

    return {hitSquare, isSquareHit, shipOnSquare, setShipOnSquare};
};

const createBoard = () => {

    const _board = [];
    let _ships = [];
    for(let i = 0; i<10; i++){
        let arr = [];
        for(let j = 0; j<10; j++){
            arr.push(square());
        }
        _board.push(arr);
    }
    
    const placeShip = (ship, firstCoordinate, vertical) => {
        if(vertical){
            if(firstCoordinate[1]+ship.shipLength-1>9){
                return false;
            }else{
                for (let i = 0; i<ship.shipLength; i++){
                    if(containsShip([firstCoordinate[0],firstCoordinate[1]+i]) !== false){
                        return false;
                    } 
                }
                for (let i = 0; i<ship.shipLength; i++){
                    _board[firstCoordinate[0]][firstCoordinate[1]+i].setShipOnSquare(ship) 
                }
            }

        }else {
            if(firstCoordinate[0]+ship.shipLength-1>9){
                return false;
            }else {
                for (let i = 0; i<ship.shipLength; i++){
                    _board[firstCoordinate[1]][firstCoordinate[0]+i].setShipOnSquare(ship) 
                }
            }
        }
        _ships.push(ship);
        return true;
    };

    const receiveAttack = (coordinates) => {
        if(coordinates[0] < 10 && coordinates[0] > -1 && coordinates[1] < 10 && coordinates[1] > -1 ){
            return _board[coordinates[0]][coordinates[1]].hitSquare();
        }else {
            throw new Error("Out of range!");
        }

    };

    const isAttacked = (coordinates) => {
        if(coordinates[0] < 10 && coordinates[0] > -1 && coordinates[1] < 10 && coordinates[1] > -1 ){
            return _board[coordinates[0]][coordinates[1]].isSquareHit();
        }else {
            throw new Error("Out of range!");
        }
    };

    const containsShip = (coordinates) => {
        if(coordinates[0] < 10 && coordinates[0] > -1 && coordinates[1] < 10 && coordinates[1] > -1 ){
            return _board[coordinates[0]][coordinates[1]].shipOnSquare() !== null;
        }else {
            throw new Error("Out of range!");
        }
    };

    const isLost = () => {
        if(_ships.length === 0){
            return false;
        }
        for (const ship in _ships){
            if(_ships[ship].isSunk() === false){
                
                return false;
            }
            
        }
        return true;
    };

    

    return {placeShip, receiveAttack, isAttacked, containsShip, isLost};
};



module.exports = createBoard;