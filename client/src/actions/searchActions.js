import axios from 'axios';

// Action Types
export const SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE';

// Action Creators
export const setSearchParams = (params) => ({
  type: SET_SEARCH_PARAMS,
  payload: params,
});

export const fetchSearchResults = (params) => async (dispatch) => {
  try {
    const response = await axios.post('/api/flights/search', params);
    dispatch({
      type: FETCH_SEARCH_RESULTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SEARCH_RESULTS_FAILURE,
      payload: error.message,
    });
  }
};
