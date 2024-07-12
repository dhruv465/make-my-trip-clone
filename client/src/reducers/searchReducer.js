import { SET_SEARCH_PARAMS, FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_FAILURE } from '../actions/searchActions';

const initialState = {
  params: {
    tripType: 'oneWay',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travellers: 1,
    fare: 1,
  },
  results: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.payload,
      };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
