const createShip = (length) => {
    const shipLength = length;
    let hitsReceived = 0;
    const hit = () => {
        if(hitsReceived >= shipLength){
            return;
        }
        hitsReceived++;
    };
    const isSunk = () => {
        if(howManyReceivedHits() === shipLength){
            return true;
        }
        return false;

    };
    const howManyReceivedHits = () => {
        return hitsReceived;
    }

    return {isSunk, hit, shipLength, howManyReceivedHits, hitsReceived};

};

module.exports = createShip;