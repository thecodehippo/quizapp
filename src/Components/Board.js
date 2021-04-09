import React from 'react';

const Board = (props) => {
    // variables
    const boardSize = 6;
    let rows = [];
    let count = 0
    

    // utility method
    const getNumber = () => {
        let newCount = count
        count ++;
        return newCount
    }

    // passing id to parent handleClick function
    const passId = (e) => {
        let id = e.target.id
        props.onClick(id);
    }

    // create board
    for (let i = 0; i < boardSize; i++) {
        let cell = []
        for (let j = 0; j < boardSize; j++) {
            cell.push(<td key={`${i}${j}`} id={getNumber()} onClick={passId}></td>)
        }
        rows.push(<tr key={i}>{cell}</tr>)
    }
    return (
        <table className="board">
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default Board