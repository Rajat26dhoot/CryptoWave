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
  import axios from 'axios';
  import  {BASE_URL} from '../../config/api.js'
  
  export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      const user = response.data;
      console.log(user);
  
      dispatch({ type: REGISTER_SUCCESS, payload: user });
      return user;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: REGISTER_FAILURE, payload: message });
      console.error("Registration error:", error);
      throw new Error(message);
    }
  };

  export const verifySignupOtp = (email, otp, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_SIGNUP_OTP_REQUEST });

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup/verify-otp`, { email, otp });
      const user = response.data;
      console.log(user);

      dispatch({ type: VERIFY_SIGNUP_OTP_SUCCESS, payload: user.jwt });
      localStorage.setItem('jwt', user.jwt);
      navigate('/');
      return user;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: VERIFY_SIGNUP_OTP_FAILURE, payload: message });
      console.error("Signup OTP verification error:", error);
      throw new Error(message);
    }
  };
  
  export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, userData);
      const user = response.data;
      console.log(user);
  
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
      localStorage.setItem('jwt', user.jwt);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: LOGIN_FAILURE, payload: message });
      console.error("Login error:", error);
      throw new Error(message);
    }
  };
  
  export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    
    try {
      const response = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      const user = response.data;
      console.log(user);
  
      dispatch({ type: GET_USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.message || error.message });
      console.error("Get user error:", error);
    }
  };
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt'); // Only remove the token instead of clearing all storage
    dispatch({ type: LOGOUT });
  };
  
