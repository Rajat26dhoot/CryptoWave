import * as types from "./ActionType";
import api from "../../config/api";

export const getAssetById = (assetId,jwt) => {
    return async (dispatch) => {
      dispatch({ type: types.GET_ASSET_REQUEST });
  
      try {
        const response = await api.get(`/api/assets/${assetId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_ASSET_SUCCESS, payload: response.data });
      } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_ASSET_FAILURE, payload: error.message });
      }     
    };
  };


export const getAssetDetails=({coinId,jwt})=>async(dispatch)=>{
    dispatch({type:types.GET_ASSET_DETAILS_REQUEST});

    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_ASSET_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_ASSET_DETAILS_FAILURE, payload: error.message });
    }
}
    
export const getUserAssets=(jwt)=>async(dispatch)=>{
    dispatch({type:types.GET_USER_ASSET_REQUEST});

    try {
        const response = await api.get(`/api/asset`, {    
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("asset",response.data);
        dispatch({ type: types.GET_USER_ASSET_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_USER_ASSET_FAILURE, payload: error.message });
    }
}
