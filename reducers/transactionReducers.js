import {
  TRANSACTION_STATUS_REQUEST, TRANSACTION_STATUS_SUCCESS,
  TRANSACTION_STATUS_FAIL, TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_FAIL, TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_ADD_REQUEST, TRANSACTION_ADD_SUCCESS,
  TRANSACTION_ADD_FAIL, TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS, TRANSACTION_DELETE_FAIL
} from "../constants/transactionConstants";



function transactionStatusReducer(state = {}, action) {
  switch (action.type) {
    case TRANSACTION_STATUS_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_STATUS_SUCCESS:
      return { ...state, loading: false, data: action.payload, status: true };
    case TRANSACTION_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload, status: false };

    default: return state;
  }
}


function transactionUpdateReducer(state = {}, action) {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, status: true };
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload, status: false };

    default: return state;
  }
}


function transactionAddReducer(state = {}, action) {
  switch (action.type) {
    case TRANSACTION_ADD_REQUEST:
      return { loading: true };
    case TRANSACTION_ADD_SUCCESS:
      return { loading: false, userInfo: action.payload, status: true };
    case TRANSACTION_ADD_FAIL:
      return { loading: false, error: action.payload, status: false };

    default: return state;
  }
}


function transactionDeleteReducer(state = {}, action) {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, userInfo: action.payload, status: true };
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload, status: false };

    default: return state;
  }
}

export {
  transactionStatusReducer,
  transactionUpdateReducer,
  transactionAddReducer,
  transactionDeleteReducer
}