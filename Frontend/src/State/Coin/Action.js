import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAIL_FAILURE, FETCH_COIN_DETAIL_REQUEST, FETCH_COIN_DETAIL_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COIN_FAILURE, FETCH_TOP_50_COIN_REQUEST, FETCH_TOP_50_COIN_SUCCESS, SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS,CLEAR_SEARCH_RESULTS } from "./ActionType";
import axios from 'axios';
import  api, {BASE_URL} from '../../config/api.js'

export const getCoinList = (page) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_LIST_REQUEST });
    
    try {
      const {data} = await axios.get(`${BASE_URL}/coins?page=${page}`);
      console.log("coin list",data);
      dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_COIN_LIST_FAILURE, payload:error.message });
      console.error(error);
    }
};


export const getTop50CoinList = () => async (dispatch) => {
    dispatch({ type: FETCH_TOP_50_COIN_REQUEST});
    
    try {
      const response = await axios.post(`${BASE_URL}/coins/top50`);
      dispatch({ type: FETCH_TOP_50_COIN_SUCCESS, payload: response.data });
      console.log("coin list",response.data);
    } catch (error) {
    console.error("error",error);
      dispatch({ type: FETCH_TOP_50_COIN_FAILURE, payload:error.message });
    }
};

export const fetchMarketChart = ({ coinId, days }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const response = await api.get(`/coins/${coinId}/chart?days=${days}`);
    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error:', error);
    dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
  }
};


export const fetchCoinById = (coinId) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_BY_ID_REQUEST});
    
    try {
      const response = await axios.post(`${BASE_URL}/coins/${coinId}`);
      dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
      console.log("coin by id",response.data);
    } catch (error) {
    console.error("error",error);
      dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload:error.message });
    }
};

export const fetchCoinDetails=({coinId,jwt})=>async(dispatch)=>{
    dispatch({type:FETCH_COIN_DETAIL_REQUEST});

    try {
        const response = await api.get(`/coins/details/${coinId}`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_COIN_DETAIL_SUCCESS, payload: response.data });
        console.log("coin details",response.data);
      } catch (error) {
      console.error("error",error);
        dispatch({ type: FETCH_COIN_DETAIL_FAILURE, payload:error.message });
      }
    
}


// export const searchCoin = (keyword) => async (dispatch) => {
//   dispatch({ type: SEARCH_COIN_REQUEST });

//   try {
//     // Step 1: Get search results
//     const searchResponse = await api.get(`/coins/search?q=${keyword}`);

//     // Step 2: Fetch details using fetchCoinDetails
//     const searchResults = await Promise.all(
//       searchResponse.data.coins.map(async (coin) => {
//         try {
//           // ✅ Use fetchCoinDetails instead of fetchCoinById
//           const detailResponse = await fetchCoinDetails({ coinId: coin.id })(dispatch);
//           const detail = detailResponse.payload;

//           return {
//             id: coin.id,
//             symbol: coin.symbol,
//             name: coin.name,
//             image: coin.large,
//             total_volume: detail.market_data?.total_volume?.usd || null,
//             market_cap: detail.market_data?.market_cap?.usd || null,
//             price_change_percentage_24h:
//               detail.market_data?.price_change_percentage_24h || null,
//             current_price: detail.market_data?.current_price?.usd || null,
//           };
//         } catch (error) {
//           console.error(`Failed to fetch details for ${coin.id}:`, error);
//           return null; // Skip this coin if details fail
//         }
//       })
//     );

//     // Filter out any failed requests (null values)
//     const filteredResults = searchResults.filter((coin) => coin !== null);

//     dispatch({ type: SEARCH_COIN_SUCCESS, payload: filteredResults });
//     console.log('Search results:', filteredResults);
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
//   }
// };






export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});