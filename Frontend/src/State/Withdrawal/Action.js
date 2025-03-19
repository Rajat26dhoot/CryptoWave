import * as types from "./ActionType";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import api from "../../config/api.js";

export const withdrawalRequest=({amount,jwt})=>async(dispatch)=>{
    dispatch({type:types.WITHDRAWAL_REQUEST});

    try {
        const response = await axios.post(`api/withdrawal/${amount}`, null, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.WITHDRAWAL_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.WITHDRAWAL_FAILURE, payload: error.message });
    }
}

export const proceedWithdrawal=({id,jwt,accept})=>async(dispatch)=>{
    dispatch({type:types.WITHDRAWAL_PROCEED_REQUEST})

    try {
        const response = await axios.patch(`api/withdrawal/admin/${id}/proceed/${accept}`, null, {
            headers: { Authorization: `Bearer ${jwt}` },
        }); 
        dispatch({ type: types.WITHDRAWAL_PROCEED_SUCCESS, payload: response.data }); 
    } catch (error) {
        console.log(error);
        dispatch({ type: types.WITHDRAWAL_PROCEED_FAILURE, payload: error.message }); 
    }
}

export const getWithdrawalHistory= jwt =>async(dispatch)=>{
    dispatch({type:types.GET_WITHDRAWAL_HISTORY_REQUEST});

    try {
        const response = await axios.get(`api/withdrawal`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_WITHDRAWAL_HISTORY_SUCCESS, payload: response.data });
    } catch (error) {   
        console.log(error);
        dispatch({ type: types.GET_WITHDRAWAL_HISTORY_FAILURE, payload: error.message });
    }
    
}

export const getAllWithdrawalRequest = jwt => async dispatch => {
    dispatch({ type: types.GET_WITHDRAWAL_REQUEST_REQUEST });

    try {
        const response = await axios.get(`${BASE_URL}/api/admin/withdrawal`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_WITHDRAWAL_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {   
        console.log(error);
        dispatch({ type: types.GET_WITHDRAWAL_REQUEST_FAILURE, payload: error.message });
    }
}


export const addPaymentDetails = ({ jwt, data }) => async (dispatch) => {
    console.log("Start adding payment details...");
    
    dispatch({ type: types.ADD_PAYMENT_DETAILS_REQUEST });
  
    try {
      const response = await api.post(
        "/api/payment-details", // Use POST to send data
        data, // Request body
        {
          headers: { Authorization: `Bearer ${jwt}` }, // Headers
        }
      );
  
      console.log("Response:", response.data);
  
      dispatch({ type: types.ADD_PAYMENT_DETAILS_SUCCESS, payload: response.data });
      console.log("Payment details added successfully:", response.data);
    } catch (error) {
      console.error("Error adding payment details:", error?.response?.data || error.message);
  
      dispatch({
        type: types.ADD_PAYMENT_DETAILS_FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
  
  

export const getPaymentDetails=({jwt})=>async(dispatch)=>{
    dispatch({type:types.GET_PAYMENT_DETAILS_REQUEST});

    try {
        const response = await axios.get(`${BASE_URL}/api/payment-details`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("payment details",response.data);
        dispatch({ type: types.GET_PAYMENT_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {   
        console.log(error);
        dispatch({ type: types.GET_PAYMENT_DETAILS_FAILURE, payload: error.message });
    }
}


