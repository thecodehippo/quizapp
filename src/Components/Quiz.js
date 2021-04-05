import React from 'react';
import HandleClicks from '../Containers/QuizContainer'

export const Quiz = () => {

    return (
        <div className="wrapper">
            <table className="board">
                <tbody>
                    <HandleClicks />
                </tbody>
            </table>
            <div className="questionBox">
                <div id="question">
                <h1>Welcome Quizzers<br></br>Click a box to start</h1>
                </div>
                <div id="answer">
                </div>
            </div>
        </div>
    )
}