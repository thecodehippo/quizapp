import { createStore } from 'redux';

const initialState = { correctIds: [], wrongIds: [] }

const answersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addCorrectId':
            return {
                ...state, 
                correctIds: [
                    ...state.correctIds, action.payload.id
                ],
            }
        case 'addWrongId':
            return {
                ...state,
                wrongIds: [
                    ...state.wrongIds, action.payload.id
                ]
            }
        default:
            return state;
    }
}

const store = createStore(answersReducer);

const actionCreator = (id, result) => {
    if (result) {
        return {
            type: 'addCorrectId',
            payload: {
                id: 1
            }
        }
    } else {
        return {
            type: 'addWrongId',
            payload: {
                id: 2
            }
        }
    }
}

export const addToStore = (questionNumber, result) => {
    store.dispatch(actionCreator(questionNumber, result));
    console.log(store.getState());
}



