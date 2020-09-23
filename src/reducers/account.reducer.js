const initial_state = {
    balance: 0,
    quoteBalance: 0,
    currency: undefined,
    quoteCurrency: undefined,
}

export const account_reducer = (state = initial_state, action) => {
    switch (action.type) {

        case ('SET_BALANCE'): {
            return { ...state, balance: action.payload }
        }

        case ('SET_CURRENCY'): {
            return { ...state, currency: action.payload }
        }

        case ('SET_QUOTE_BALANCE'): {
            return { ...state, quoteBalance: action.payload }
        }

        case ('SET_QUOTE_CURRENCY'): {
            return { ...state, quoteCurrency: action.payload }
        }

        default: {
            return state
        }
    }
}