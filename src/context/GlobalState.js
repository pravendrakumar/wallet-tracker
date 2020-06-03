import React, { useReducer, createContext } from "react";
import AppReducer from "./AppReducer";
import http from "../http";
// Initail state
const initialState = {
  transactions: [],
  transaction: {
    text: "",
    amount: 0,
  },
};

//Create context
export const GlobalContext = createContext(initialState);

//Provide component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const deleteTransaction = (id) => {
    http
      .delete(`/delete/${id}`)
      .then(function (data) {
        dispatch({
          type: "DELETE_TRANSACTION",
          payload: id,
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };
  const addTransaction = (transaction) => {
    http
      .post("/add", transaction)
      .then(function (data) {
        dispatch({
          type: "ADD_TRANSACTION",
          payload: transaction,
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  const setUpdate = (id) => {
    dispatch({
      type: "SET_UPDATE_TRANSACTION",
      payload: id,
    });
  };
  const updateTransaction = (transaction) => {
    http
      .put("/update", transaction)
      .then(function (data) {
        dispatch({
          type: "UPDATE_TRANSACTION",
          payload: transaction,
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  const setTransactions = (transactions) => {
    dispatch({
      type: "SET_TRANSACTIONS",
      payload: transactions,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        formTrans: state.transaction,
        deleteTransaction,
        addTransaction,
        setUpdate,
        updateTransaction,
        setTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
