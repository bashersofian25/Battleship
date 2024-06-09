const { experiments } = require('webpack');
const createPlayer = require("../src/createPlayer");

test('player gets attacked successfully', () => {
    const player = createPlayer(true);

    expect(player.attacked([1,1])).toBe(true);
});


test('player board is defined', () => { 
    const player =  createPlayer(true);

    expect(player.getPlayerBoard).toBeDefined();
});


test('player type is correct', () => {
    const human = createPlayer(true);
    const computer = createPlayer(false);

    expect(human.isPlayerHuman()).toBe(true);
    expect(computer.isPlayerHuman()).toBe(false);
});

test('player can attack, and other player is affected', () => {
    const human = createPlayer(true);
    const computer = createPlayer(false);
    expect(computer.getPlayerBoard().isAttacked([2, 2])).toBe(false);
    expect(human.attack(computer, [2, 2])).toBe(true);
    expect(computer.getPlayerBoard().isAttacked([2, 2])).toBe(true);
});

test('getting player id', () => {
    const player = createPlayer(true, 'myPlayer');
    expect(player.getPlayerID()).toBe('myPlayer');
});