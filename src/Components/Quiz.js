import React, { useState } from 'react';
import AnswersBox from './AnswersBox';
import Board from './Board';
import Header from './Header';
import QuestionBox from './QuestionBox';
import WelcomeBox from './WelcomeBox';
import { addToStore } from '../Containers/Store';

export const Quiz = () => {

    // Information to reach API
    const url = "https://opentdb.com/api.php";
    const queryParams = '?amount=36&encode=base64';

    // Fetching Data State
    const [data, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

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
    const [answerStatus, setAnswerStatus] = useState('');

    const handleClick = (id) => {
        setActiveQuestion(id);
        setAnswerStatus('');
    }

    const handleAnswer = (res) => {
        setAnswerStatus(res);
    };
 
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
                            addToStore={addToStore}
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
        </div>
    )
}