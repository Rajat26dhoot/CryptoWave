import api from "../../config/api.js";
import * as types from "./ActionType.js";


export const payOrder = ({ jwt, orderData }) => async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });

    console.log("Payload being sent:", orderData);

    try {
        const response = await api.post(`api/orders/pay`, orderData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.PAY_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("Error:", error);
        dispatch({ type: types.PAY_ORDER_FAILURE, payload: error.message });
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