

export const buildBoard = (id, handleClick) => {
    const board = document.createElement('div');
    board.setAttribute('id', id);
    board.setAttribute('class', "board");

    const rows = [];

    for (let i = 0; i< 10; i++){
        rows[i] = document.createElement('div');
        rows[i].classList.add('row');
        for(let j = 0; j<10; j++){
            const square = document.createElement('div');
            square.setAttribute('row', i);
            square.setAttribute('col', j);
            square.classList.add('square');
            square.addEventListener('click',(e) => {
                const coordinates = []
                const playerID = e.target.parentNode.parentNode.id;
                coordinates.push(parseInt(e.target.getAttribute('row')));
                coordinates.push(parseInt(e.target.getAttribute('col')));
                console.log(coordinates, playerID);
                handleClick(coordinates, playerID, e);
            });
            rows[i].append(square);
        }
        board.append(rows[i]);
        
    }
    return board;
};