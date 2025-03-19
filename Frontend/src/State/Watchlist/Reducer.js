import * as types from "./ActionType";

import existInWatchlist from "../../utils/existInWatchlist";

const initialState = {
  watchlist: [],
  loading: false,
  error: null,
  items: [],
};

// Utility function to check if item exists in the watchlist

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Watchlist Request
    case types.GET_WATCHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    // Get Watchlist Success
    case types.GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        watchlist: action.payload,
        items: action.payload.coins,
        loading: false,
        error: null,
      };

    // Add Item to Watchlist Request
    case types.ADD_ITEM_TO_WATCHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    // Add Item to Watchlist Success
    case types.ADD_ITEM_TO_WATCHLIST_SUCCESS: {
        const updatedItems = existInWatchlist(state.items, action.payload)
            ? state.items.filter((item) => item.id !== action.payload.id)
            : [...state.items, action.payload];
        return { ...state, items: updatedItems, loading: false, error: null };
    }
    

    case types.GET_WATCHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default watchlistReducer;
