import api from "../../config/api.js";
import * as types from "./ActionType.js";
import { getAssetDetails, getUserAssets } from "../Asset/Action.js";
import { getUserWallet, getWalletTransaction } from "../Wallet/Action.js";


export const payOrder = ({ jwt, orderData }) => async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });

    console.log("Payload being sent:", orderData);

    try {
        const response = await api.post(`api/orders/pay`, orderData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.PAY_ORDER_SUCCESS, payload: response.data });
        await Promise.all([
            dispatch(getUserWallet(jwt)),
            dispatch(getWalletTransaction(jwt)),
            dispatch(getUserAssets(jwt)),
            dispatch(getAssetDetails({ coinId: orderData.coinId, jwt })),
            dispatch(getAllOrdersForUser(jwt)),
        ]);
    } catch (error) {
        console.log("Error:", error);
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Order failed";
        dispatch({ type: types.PAY_ORDER_FAILURE, payload: message });
        throw new Error(message);
    }
};

export const getOrderById=(jwt,orderId)=>async(dispatch)=>{
    dispatch({type:types.GET_ORDER_REQUEST});

    try {
        const response = await api.get(`api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_ORDER_FAILURE, payload: error.message });
    }
}

export const getAllOrdersForUser=(jwt,orderType)=>async(dispatch)=>{
    dispatch({type:types.GET_ALL_ORDER_REQUEST});

    try {
        const response = await api.get(`api/orders`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: {
                order_type: orderType
            }
        });

        dispatch({ type: types.GET_ALL_ORDER_SUCCESS, payload: response.data });
    } catch (error) {   
        console.log(error);
        dispatch({ type: types.GET_ALL_ORDER_FAILURE, payload: error.message });
    }
}
