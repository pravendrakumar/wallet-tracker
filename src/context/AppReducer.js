export default (state, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (trans) => trans.id !== action.payload
        ),
      };
    case "SET_UPDATE_TRANSACTION":
      return {
        ...state,
        transaction: state.transactions.find(
          (trans) => trans.id === action.payload
        ),
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((trans) => {
          if (trans.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return trans;
          }
        }),
      };
    default:
      return state;
  }
};
