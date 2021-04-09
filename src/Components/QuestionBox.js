import React from 'react';

const QuestionBox = (props) => {

    return (
        <div className="question">
        {atob(props.activeQuestion)}
     </div>
    )
}

export default QuestionBox;