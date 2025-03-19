import api from "../../config/api.js";
import *  as types from "./ActionType.js";

export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_WALLET_REQUEST });

    try {
        const response = await api.get("/api/wallet", {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("wallet",response.data);
        dispatch({ type: types.GET_USER_WALLET_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_USER_WALLET_FAILURE, payload: error.message });
    }
};



export const getWalletTransaction = ({jwt}) => async (dispatch) => {
    dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

    try {
        const response = await api.get("/api/wallet/transactions", {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_WALLET_TRANSACTION_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_WALLET_TRANSACTION_FAILURE, payload: error.message });
    }
};


export const depositMoney = ({ jwt, orderId, paymentId, navigate }) => async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
        const response = await api.put(
            "/api/wallet/deposit",
            null, // No request body, so pass `null`
            {
                headers: { Authorization: `Bearer ${jwt}` },
                params: {
                    order_id: orderId, // Keep snake_case to match API expectations
                    payment_id: paymentId,
                },
            }
        );
        console.log("deposit")

        dispatch({ type: types.DEPOSIT_MONEY_SUCCESS, payload: response.data });
        navigate("/wallet");
    } catch (error) {
        console.error("Deposit Error:", error?.response?.data || error.message);
        dispatch({
            type: types.DEPOSIT_MONEY_FAILURE,
            payload: error?.response?.data?.message || error.message,
        });
    }
};


export const paymentHandler = (paymentMethod, amount, jwt) => async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
        const response = await api.post(
            `/api/payment/${paymentMethod}/amount/${amount}`, 
            {}, // No request body, so pass an empty object
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );

        console.log(response.data.payment_url);
        window.location.href = response.data.payment_url;

        // dispatch({ type: types.DEPOSIT_MONEY_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Payment Error:", error?.response?.data || error.message);
        dispatch({
            type: types.DEPOSIT_MONEY_FAILURE,
            payload: error?.response?.data?.message || error.message,
        });
    }
};



export const transferMoney = ({ jwt, walletId, requestData }) => async (dispatch) => {
    dispatch({ type: types.TRANSFER_MONEY_REQUEST });
  
    try {
      const response = await api.put(`/api/wallet/${walletId}/transfer`, requestData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: types.TRANSFER_MONEY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.TRANSFER_MONEY_FAILURE, payload: error.message });
    }
  };
  






