const { experiments } = require('webpack');
const board = require('../src/GameBoard');
const ship = require('../src/createShip');



test('placing ships correctly (in range), returns true', () => {

    const myBoard = board();
    const myShip = ship(2);
    const isPlaced = myBoard.placeShip(myShip, [2,2], true);
    expect(isPlaced).toBe(true);

});

test('placing ships incorrectly (out of range) returns false', () => {

    const myBoard = board();
    const myShip = ship(2);
    const isPlaced = myBoard.placeShip(myShip, [9,0], false);
    expect(isPlaced).toBe(false);

});




test('placing ships on top of each other, returns false', () => {

    const myBoard = board();
    const firstShip = ship(2);
    const secondShip = ship(2);
    const firstPlaced = myBoard.placeShip(firstShip, [4,4], false);
    expect(firstPlaced).toBe(true);
    const secondPlaced = myBoard.placeShip(secondShip, [4,4], true);
    expect(secondPlaced).toBe(false);
});

test('squares getting attacked correctly', () => {
    const myBoard = board();
    expect(myBoard.isAttacked([2, 2])).toBe(false);
    myBoard.receiveAttack([2, 2]);
    expect(myBoard.isAttacked([2, 2])).toBe(true);

});

test("a square not containing a ship", () => {
    const myBoard = board();

    expect(myBoard.containsShip([0,0])).toBe(false);
});

test("a square containing a ship", () => {

    const myBoard = board();
    const myShip = ship(2);
    myBoard.placeShip(myShip, [2, 2], true);
    expect(myBoard.containsShip([2, 2])).toBe(true);
    expect(myBoard.containsShip([2, 3])).toBe(true);
    expect(myBoard.containsShip([2, 4])).toBe(false);
   
});

test("returns false when attacking a square twice or more", () => {
    const myBoard = board();
    expect(myBoard.receiveAttack([2, 3])).toBe(true);
    expect(myBoard.receiveAttack([2, 3])).toBe(false);
});


test("does not accept out of range inputs", () => {
    const myBoard = board();
    expect(() => {myBoard.receiveAttack([10, 10])}).toThrow("Out of range!");
    expect(() => {myBoard.containsShip([10, 10])}).toThrow("Out of range!");
    expect(() => {myBoard.isAttacked([10, 10])}).toThrow("Out of range!");
});

test('board can lose correctly', () => {
    const myBoard = board();
    const myShip = ship(2);
    myBoard.placeShip(myShip, [2 ,2], true);
    expect(myBoard.receiveAttack([2 ,2])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
    expect(myBoard.receiveAttack([2 ,3])).toBe(true);
    expect(myBoard.isLost()).toBe(true);
});

test('board does not lose correctly', () => {
    const myBoard = board();
    const myShip = ship(2);
    const anotherShip = ship(2);
    myBoard.placeShip(myShip, [2 ,2], true);
    myBoard.placeShip(anotherShip, [3 ,3], true);
    expect(myBoard.receiveAttack([2 ,2])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
    expect(myBoard.receiveAttack([2 ,3])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
});


test('board can lose with more than one ship', () => {
    const myBoard = board();
    const myShip = ship(2);
    const anotherShip = ship(2);
    myBoard.placeShip(myShip, [2 ,2], true);
    myBoard.placeShip(anotherShip, [3 ,3], true);
    expect(myBoard.receiveAttack([2 ,2])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
    expect(myBoard.receiveAttack([2 ,3])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
    expect(myBoard.receiveAttack([3 ,3])).toBe(true);
    expect(myBoard.isLost()).toBe(false);
    expect(myBoard.receiveAttack([3 ,4])).toBe(true);
    expect(myBoard.isLost()).toBe(true);
});

