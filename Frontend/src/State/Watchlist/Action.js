import api from "../../config/api";
import * as types from "./ActionType";

export const getUserWatchlist = (jwt) => async (dispatch) => {
    dispatch({
        type: types.GET_USER_WATCHLIST_REQUEST
    });

    try {
        const response = await api.get(`/api/watchlist/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("watchlist", response.data);
        dispatch({ type: types.GET_USER_WATCHLIST_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_USER_WATCHLIST_FAILURE, payload: error.message });
    }
};


export const addItemToWatchlist = ({ coinId ,jwt}) => async (dispatch) => {
    dispatch({ type: types.ADD_ITEM_TO_WATCHLIST_REQUEST });

    console.log("coinId:", coinId);
console.log("jwt:", jwt);


    try {
        const response = await api.patch(
            `/api/watchlist/add/coin/${coinId}`,
            { coinId },
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );
        console.log("watchlist item", response.data);
        dispatch({ type: types.ADD_ITEM_TO_WATCHLIST_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.ADD_ITEM_TO_WATCHLIST_FAILURE, payload: error.message });
    }
};