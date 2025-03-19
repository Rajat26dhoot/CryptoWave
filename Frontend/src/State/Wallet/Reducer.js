import * as types from "./ActionType";

const initialState = {
    userWallet: {},
    loading: false,
    error: null,
    transaction: [],
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        // Start loading cases
        case types.GET_USER_WALLET_REQUEST:
        case types.DEPOSIT_MONEY_REQUEST:
        case types.TRANSFER_MONEY_REQUEST:
        case types.GET_WALLET_TRANSACTION_REQUEST:
            return { ...state, loading: true, error: null };

        // Success cases
        case types.GET_USER_WALLET_SUCCESS:
        case types.TRANSFER_MONEY_SUCCESS:
            return { 
                ...state, 
                userWallet: action.payload, 
                loading: false, 
                error: null 
            };

        case types.DEPOSIT_MONEY_SUCCESS:
            return { 
                ...state, 
                userWallet: { 
                    ...state.userWallet, 
                    balance: action.payload.balance 
                }, 
                loading: false, 
                error: null 
            };

        case types.GET_WALLET_TRANSACTION_SUCCESS:
            return { 
                ...state, 
                transaction: action.payload, 
                loading: false, 
                error: null 
            };

        // Failure cases
        case types.GET_USER_WALLET_FAILURE:
        case types.DEPOSIT_MONEY_FAILURE:
        case types.TRANSFER_MONEY_FAILURE:
        case types.GET_WALLET_TRANSACTION_FAILURE: // Added this line
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        default:
            return state;
    }
};

export default walletReducer;
