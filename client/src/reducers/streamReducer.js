import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
        case 'FETCH_STREAM':
            return {...state, [action.payload.id]: action.payload};
            // Lodash function .mapKeys would, given an array of objects,
            // return a different object with key-value pairs: key being the values of the 
            // key parameter given and the values being each object in the array
        case 'CREATE_STREAMS':
            return {...state, [action.payload.id]: action.payload};
        case 'EDIT_STREAM':
            return {...state, [action.payload.id]: action.payload};
        case 'DELETE_STREAM':
            return _.omit(state, action.payload);
        case 'FETCH_STREAMS':
            return {...state, ..._.mapKeys(action.payload, 'id')};
    }
}