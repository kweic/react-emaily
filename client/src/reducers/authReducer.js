//lowercase file indicates that I'll be exporting a function from the file
import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        default: 
            return state;
    }
}