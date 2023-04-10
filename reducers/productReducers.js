import {
    PRODUCT_STATUS_REQUEST, PRODUCT_STATUS_SUCCESS,
    PRODUCT_STATUS_FAIL, PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL, PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_POPULAR_STATUS_REQUEST,PRODUCT_POPULAR_STATUS_SUCCESS,
    PRODUCT_POPULAR_STATUS_FAIL,PRODUCT_VENDOR_STATUS_REQUEST,
    PRODUCT_VENDOR_STATUS_SUCCESS,PRODUCT_VENDOR_STATUS_FAIL
  } from "../constants/productConstants";
  
  
  
  function ProductStatusReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_STATUS_REQUEST:
        return { ...state, loading: true ,data: action.payload,};
      case PRODUCT_STATUS_SUCCESS:
        return { ...state, loading: false, data: action.payload, status: true };
      case PRODUCT_STATUS_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  

  function ProductPopularStatusReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_POPULAR_STATUS_REQUEST:
        return { ...state, loading: true };
      case PRODUCT_POPULAR_STATUS_SUCCESS:
        return { ...state, loading: false, data: action.payload, status: true };
      case PRODUCT_STATUS_FAIL:
        return { ...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function ProductUpdateReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { ...state,loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { ...state,loading: false, data: action.payload, status: true };
      case PRODUCT_POPULAR_STATUS_FAIL:
        return { ...state,loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function ProductAddReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_ADD_REQUEST:
        return { loading: true };
      case PRODUCT_ADD_SUCCESS:
        return { loading: false, data: action.payload, status: true };
      case PRODUCT_ADD_FAIL:
        return { loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  
  function ProductDeleteReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, data: action.payload, status: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }

  function ProductVendorReducer(state = {}, action) {
    switch (action.type) {
      case PRODUCT_VENDOR_STATUS_REQUEST:
        return { ...state,loading: true };
      case PRODUCT_VENDOR_STATUS_SUCCESS:
        return { ...state,loading: false, data: action.payload, status: true };
      case PRODUCT_VENDOR_STATUS_FAIL:
        return {...state, loading: false, error: action.payload, status: false };
  
      default: return state;
    }
  }
  
  export {
    ProductStatusReducer,
    ProductUpdateReducer,
    ProductAddReducer,
    ProductDeleteReducer,
    ProductPopularStatusReducer,
    ProductVendorReducer
  }