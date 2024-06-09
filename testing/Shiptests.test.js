const { experiments } = require('webpack');
const ship = require('../src/createShip');



test('creation of a ship', () => {
    const myShip = ship(4); 
    expect(myShip.shipLength).toBe(4);
});

test('hit a ship', () => {
    const myShip = ship(4);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.howManyReceivedHits()).toBe(3);
});

test("hit a ship more that it's length", () => {
    const myShip = ship(4);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.howManyReceivedHits()).toBe(4);
});

test("ship is sinking after length number of hits", () => {
    const myShip = ship(4);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
});