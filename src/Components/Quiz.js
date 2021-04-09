import React, { useState } from 'react';
import Header from './Header';
import Board from './Board';
import WelcomeBox from './WelcomeBox';
import QuestionBox from './QuestionBox';
import AnswersBox from './AnswersBox';
import { createStore } from 'redux';

export const Quiz = () => {
    // create redux store for holding answers
    const initialState = [];
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'answer/correct':
                return [ ...state, action.payload]
            default:
                return state;
        }
    }
    const store = createStore(reducer);

    // Information to reach API
    const url = "https://opentdb.com/api.php";
    const queryParams = '?amount=36&encode=base64';

    // Fetching Data State
    const [data, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [answerStatus, setAnswerStatus] = useState('');

    async function fetchData() {
        await fetch(url+queryParams)
        .then(r => r.json())
        .then(d => setData(d))
        
        .catch(e => console.log(e))
        if (!data) {
            setIsLoaded(true)
        }
    }

    useState(() => {
        fetchData();
    })

    // allow setting an active question
    const [activeQuestion, setActiveQuestion] = useState();

    const handleClick = (id) => {
        setActiveQuestion(id);
        setAnswerStatus('');
    }

    const handleAnswer = (res) => {
        setAnswerStatus(res);
    };

    const addCorrectAnswer = (i) => {
        store.dispatch({
            type: 'answer/correct',
            payload: i
        })
    }

    const logStore = () => {
        console.log(store.getState());
    }

    store.subscribe(logStore);
 
    // logic to handle whether to display loading, welcome, question or answer box
    const decideBox = () => {
        if (!isLoaded) {
            return <p>Loading...</p>
        } else if (isLoaded) {
            if (!activeQuestion) {
                return <WelcomeBox /> 
            } else {
                return (
                    <div className="questionBox">
                        <QuestionBox answerStatus={answerStatus} activeQuestion={data.results[activeQuestion].question} />
                        <AnswersBox 
                            activeQuestion={activeQuestion}
                            addCorrectAnswer={addCorrectAnswer}
                            handleAnswer={handleAnswer}
                            answerStatus={answerStatus}
                            correctAnswer={data.results[activeQuestion].correct_answer} 
                            incorrectAnswers={data.results[activeQuestion].incorrect_answers}
                        />
                    </div>
                )
            }
        }
    }

    return (
        <div className="wrapper">
            <Header />
            <Board onClick={handleClick} />
            {decideBox()}
            <button onClick={() => console.log(store.getState())}>click me</button>
        </div>
    )
}