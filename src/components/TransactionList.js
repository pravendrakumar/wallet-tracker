import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";
import http from "../http";

const TransactionList = () => {
  const { transactions, setTransactions } = useContext(GlobalContext);
  useEffect(() => {
    http
      .get("/transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
