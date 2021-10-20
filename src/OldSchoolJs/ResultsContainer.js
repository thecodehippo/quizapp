// Import createStore here
import * as redux from 'redux'

const ResultsCounter = () => {
    const initialState = 0;

    const countReducer = (state = initialState, action) => {
        switch (action.type) {
          case 'increment':
            return state + 1;
          case 'decrement':
            return state - 1;
          default:
            return state;
        }
    }

    // Create the store here
    const store = redux.createStore(countReducer);

    return <div>{`Your score is ${store.getState()}`}</div>

}

export default ResultsCounter;