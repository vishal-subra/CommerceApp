import {
    LEADERBOARD_GET_SUCCESS, LEADERBOARD_GET_REQUEST,
    LEADERBOARD_GET_FAIL,RATING_ADD_REQUEST
    ,RATING_ADD_SUCCESS,RATING_ADD_FAIL
} from "../constants/leaderboardConstants";
  

  function LeaderboardGetReducer(state = {}, action) {
    switch (action.type) {
      case LEADERBOARD_GET_REQUEST:
        return { ...state, loading: true };
      case LEADERBOARD_GET_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case LEADERBOARD_GET_FAIL:
        return {...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }


  function RatingAddReducer(state = {}, action) {
    switch (action.type) {
      case RATING_ADD_REQUEST:
        return { ...state, loading: true };
      case RATING_ADD_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case RATING_ADD_FAIL:
        return {...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  export {
    LeaderboardGetReducer,
    RatingAddReducer
  }