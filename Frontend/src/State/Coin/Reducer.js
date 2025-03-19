import { 
    FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS,
    FETCH_COIN_DETAIL_FAILURE, FETCH_COIN_DETAIL_REQUEST, FETCH_COIN_DETAIL_SUCCESS,
    FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS,
    FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS,
    FETCH_TOP_50_COIN_FAILURE, FETCH_TOP_50_COIN_REQUEST, FETCH_TOP_50_COIN_SUCCESS,
    SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS 
} from "./ActionType";

const initialState = {
    coinList: [],
    top50: [],
    searchCoinList: [],
    marketChart: { data: [], loading: false },
    coinById: null,
    coinDetails: null,
    loading: false,
    error: null,
};

const coinReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading State
        case FETCH_COIN_LIST_REQUEST:
        case FETCH_COIN_BY_ID_REQUEST:
        case FETCH_COIN_DETAIL_REQUEST:
        case SEARCH_COIN_REQUEST:
        case FETCH_TOP_50_COIN_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case FETCH_MARKET_CHART_REQUEST:
            return {
                ...state,
                marketChart: { loading: true, data: [] },
                error: null,
            };

        // Success States
        case FETCH_COIN_LIST_SUCCESS:
            return {
                ...state,
                coinList: action.payload,
                loading: false,
                error: null,
            };

        case FETCH_TOP_50_COIN_SUCCESS:
            return {
                ...state,
                top50: action.payload,
                loading: false,
                error: null,
            };

        case FETCH_MARKET_CHART_SUCCESS:
            console.log(action.payload.prices)
            return {
                ...state,
                marketChart: { data: action.payload.prices, loading: false },
                error: null,
            };

        case FETCH_COIN_BY_ID_SUCCESS:
            return {
                ...state,
                coinById: action.payload,
                loading: false,
                error: null,
            };

        case SEARCH_COIN_SUCCESS:
            return {
                ...state,
                searchCoinList: action.payload.coins,
                loading: false,
                error: null,
            };

        case FETCH_COIN_DETAIL_SUCCESS:
            return {
                ...state,
                coinDetails: action.payload,
                loading: false,
                error: null,
            };

        // Failure States
        case FETCH_MARKET_CHART_FAILURE:
            return {
                ...state,
                marketChart: { data: [], loading: false },
                error: action.payload, // Fixed to assign error from payload
            };

            case 'CLEAR_SEARCH_RESULTS':
            return {
                ...state,
                searchCoinList: [],
            };


        case FETCH_COIN_LIST_FAILURE:
        case SEARCH_COIN_FAILURE:
        case FETCH_COIN_BY_ID_FAILURE:
        case FETCH_COIN_DETAIL_FAILURE:
        case FETCH_TOP_50_COIN_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        // Default State
        default:
            return state;
    }
};

export default coinReducer;
