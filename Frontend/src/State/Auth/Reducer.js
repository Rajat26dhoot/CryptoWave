import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
  } from "./ActionType";
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          jwt: action.payload,
          error: null,
        };
  
      case GET_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null,
        };
  
      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
      case GET_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  