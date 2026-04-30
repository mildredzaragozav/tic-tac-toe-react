export function calculateWinner(squares) {
    const winning_lines = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    for (let i = 0; i < winning_lines.length; i++) {
        const [a,b,c] = winning_lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])  {
            return squares[a];
        }
    }

    return null;
}