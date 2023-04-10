import {
    CART_STATUS_REQUEST, CART_STATUS_SUCCESS,
    CART_STATUS_FAIL, CART_UPDATE_REQUEST,
    CART_UPDATE_FAIL, CART_UPDATE_SUCCESS,
    CART_ADD_REQUEST, CART_ADD_SUCCESS,
    CART_ADD_FAIL, CART_DELETE_REQUEST,
    CART_DELETE_SUCCESS, CART_DELETE_FAIL
  } from "../constants/cartConstants";
  
  
  
  function CartStatusReducer(state = {}, action) {
    switch (action.type) {
      case CART_STATUS_REQUEST:
        return { ...state, loading: true };
      case CART_STATUS_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case CART_STATUS_FAIL:
        return {...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function CartUpdateReducer(state = {}, action) {
    switch (action.type) {
      case CART_UPDATE_REQUEST:
        return { ...state ,loading: true };
      case CART_UPDATE_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case CART_UPDATE_FAIL:
        return { ...state ,loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function CartAddReducer(state = {}, action) {
    switch (action.type) {
      case CART_ADD_REQUEST:
        return { ...state ,loading: true };
      case CART_ADD_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case CART_ADD_FAIL:
        return { ...state ,loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function CartDeleteReducer(state = {}, action) {
    switch (action.type) {
      case CART_DELETE_REQUEST:
        return { ...state ,loading: true };
      case CART_DELETE_SUCCESS:
        return { ...state ,loading: false, data: action.payload, status: true };
      case CART_DELETE_FAIL:
        return { ...state ,loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  export {
    CartStatusReducer,
    CartUpdateReducer,
    CartAddReducer,
    CartDeleteReducer
  }