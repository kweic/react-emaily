import axios from 'axios';
import { FETCH_USER } from './types';

//redux-thunk will see that the type returned is a function
// will automatically call the function and pass in the dispatch function as an argument
// anything thrown in to dispatch will automatically be forwarded off to all the different reducers in the application

/*
//pre-refactor version
export const fetchUser = () => {
    return function(dispatch) {
        axios
            .get('/api/current_user')
            .then(res => dispatch({ type: FETCH_USER, payload: res }));
    };
};
*/

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({ type: FETCH_USER, payload: res.data });
};
