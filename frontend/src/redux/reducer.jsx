export default function reducer(state = {
    user: '',
    fullName: ''
}, action) {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                user: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                user: ''
            };
        case 'ADD_NAME':
            return {
                ...state,
                fullName: action.payload
            }
        default:
            return state;
    }
}