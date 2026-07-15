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
    REGISTER_SUCCESS,
    VERIFY_SIGNUP_OTP_FAILURE,
    VERIFY_SIGNUP_OTP_REQUEST,
    VERIFY_SIGNUP_OTP_SUCCESS
  } from "./ActionType";
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
    signupOtpSent: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case VERIFY_SIGNUP_OTP_REQUEST:
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case LOGIN_SUCCESS:
      case VERIFY_SIGNUP_OTP_SUCCESS:
        return {
          ...state,
          loading: false,
          jwt: action.payload,
          error: null,
          signupOtpSent: false,
        };

      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          signupOtpSent: true,
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
      case VERIFY_SIGNUP_OTP_FAILURE:
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
  
