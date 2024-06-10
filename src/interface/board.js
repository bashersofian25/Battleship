

export const renderBoard = (player, handelClick) => {
  
    const board = document.createElement('div');
    board.setAttribute('id', player.getPlayerID());
    board.setAttribute('class', "board");

    const playerBoard  = player.getPlayerBoard();
    const id = player.getPlayerID();

    const rows = [];

    for (let i = 0; i< 10; i++){
        rows[i] = document.createElement('div');
        rows[i].classList.add('row');
        for(let j = 0; j<10; j++){
            const square = document.createElement('div');
            square.setAttribute('row', i);
            square.setAttribute('col', j);
            square.classList.add('square');
            if(player.getPlayerID() === "player1"){
                if(player.getPlayerBoard().containsShip([i, j])){
                    square.classList.add('my-ship');
                }
                
            }
            if(playerBoard.isAttacked([i,j]) && playerBoard.containsShip([i,j])){
                square.classList.add('onShip');
            }else if(playerBoard.isAttacked([i,j])){
                square.classList.add('empty');
            }
            square.addEventListener('click',(e) => {
                const coordinates = []
                if(player.getPlayerID() ==  'player1'){// very bad code (Ew,yuck) wrote a lot of it today
                    return;
                }
                
                coordinates.push(parseInt(e.target.getAttribute('row')));
                coordinates.push(parseInt(e.target.getAttribute('col')));
                e.target.addEventListener('click',handelClick(coordinates));
            });
            rows[i].append(square);
        }
        board.append(rows[i]);
        
    }
    return board;
};