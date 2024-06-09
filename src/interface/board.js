

export const buildBoard = (id) => {
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
                coordinates.push(e.target.getAttribute('row'));
                coordinates.push(e.target.getAttribute('col'));
                console.log(coordinates);

            });
            rows[i].append(square);
        }
        board.append(rows[i]);
        
    }
    console.log(board);
    return board;
};