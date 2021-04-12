import React from 'react';

const AnswersBox = (props) => {
    
    // add all answers into array
    let answers = []
    let ca = atob(props.correctAnswer);
    answers.push(ca);
    props.incorrectAnswers.map((a) => answers.push(atob(a)))

    const buildAnswers = () => {
        if (!props.answerStatus) {
            let mixAnswers = [];

            // mix up the answers
            let numLoops = answers.length
            for (let l = 0; l < numLoops; l++) {
        
                //pick a random number
                let randomNum = Math.floor(Math.random() * answers.length)
                
                //return item at index
                let an = answers[randomNum];
        
                //push into new array
                mixAnswers.push(<button className="myButton" onClick={checkAnswer} key={l}>{an}</button>);
        
                //remove item from original array
                answers.splice(randomNum,1);
            }
            return mixAnswers;
        }
        else return <h1>{props.answerStatus}</h1>
    }

    // check answer on click and pass up to parent to set in state
    const checkAnswer = (e) => {
        if (e.target.innerHTML === ca) {
            props.handleAnswer('Correct!');
            props.addToStore(2, 'correct'); // THIS DOESN'T WORK WHEN INSIDE THIS FUNCTION
        } else {
            props.handleAnswer('Wrong!')
            props.addToStore(3, 'wrong'); // THIS DOESN'T WORK WHEN INSIDE THIS FUNCTION
        }
    }


    return (
        <div className="answer">
            {buildAnswers()}
            <button onClick={props.addToStore}>This button will add to store using props from the child component</button>
        </div>
    )
}

export default AnswersBox;