import React, { useState, useEffect } from 'react';

const HandleClicks = () => {
    //set global variables
    let boardSize = 6;
    let ca = ''
    let count = 0
    let rows = [];
    let mixAnswers = [];

    // Information to reach API
    const url = "https://opentdb.com/api.php";
    const queryParams = '?amount=36&encode=base64';

    // Fetching Data
    const [data, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(false);

    useEffect(() => {
        fetchQuestions();
    },[])

    const fetchQuestions = async () => {
        const response = await fetch(url+queryParams)
            .then(response => response.json())
            .then(result => {
                setData(result);
            })
            .catch(e => {
                console.log(e);
            })
            if (!data) {
                setIsLoaded(true);
            }
    }

    // Utilities

    const getNumber = () => {
        let newCount = count
        count ++;
        return newCount
    }

    const displayQuestion = (e) => {

        if (!activeQuestion) {
            //set up variables and reset answer box
            let id = e.target.id;
            let answers = [];
            document.getElementById('answer').innerHTML = '';
            document.getElementById(id).style.backgroundColor = 'gray';

            //display question
            let question = data.results[id].question
            document.getElementById('question').innerHTML = atob(question);

            //create answer array
            ca = atob(data.results[id].correct_answer)
            answers.push(ca)
            data.results[id].incorrect_answers.map((a) => answers.push(atob(a)))

            //mix up answer array
            let numLoops = answers.length;
            for (let l = 0; l < numLoops; l++) {

                //pick a random number from array length
                let randomNum = Math.floor(Math.random() * answers.length)
                
                //return item at index
                let an = answers[randomNum];

                //push into new array
                mixAnswers.push(an)

                //remove item from original array
                answers.splice(randomNum,1);
            }

            //display answer buttons
            for (let k = 0; k < mixAnswers.length; k++) {
                let btn = document.createElement("BUTTON")
                btn.setAttribute('value', id)
                btn.setAttribute('id', `btn${k}`)
                btn.addEventListener('click', checkAnswer);
                btn.innerHTML = mixAnswers[k];
                document.getElementById('answer').appendChild(btn);
            }

            //set active question true
            setActiveQuestion(true);
        }
    }   
    
    const checkAnswer = (e) => {
        let id = e.target.value
        if (e.target.innerHTML === ca) {
            document.getElementById(id).style.backgroundColor = "green"
            document.getElementById('question').innerHTML = "WELL DONE!"
            for (let h = 0; h < mixAnswers.length; h++) {
                document.getElementById(`btn${h}`).style.display = 'none'
            }
        } else {
            document.getElementById(id).style.backgroundColor = "red"
            document.getElementById('question').innerHTML = "WRONG!"
            for (let h = 0; h < mixAnswers.length; h++) {
                document.getElementById(`btn${h}`).style.display = 'none'
            }
        }
        setActiveQuestion(false);
    }

    if(isLoaded) {
        for (let i = 0; i < boardSize; i++) {
            let cell = []
            for (let j = 0; j < boardSize; j++) {
                cell.push(<td key={`${i}${j}`} id={getNumber()} onClick={displayQuestion}></td>)
            }
            rows.push(<tr key={i}>{cell}</tr>)
        }
        return rows
    } else {
        return <tr><td>Loading</td></tr>
    }
}

export default HandleClicks