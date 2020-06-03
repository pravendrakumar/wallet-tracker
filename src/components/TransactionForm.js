import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const TransactionForm = () => {
  const { addTransaction, formTrans, updateTransaction } = useContext(
    GlobalContext
  );
  const [transaction, setTransaction] = useState(formTrans);
  useEffect(() => {
    setTransaction(formTrans);
  }, [formTrans]);
  const onChangeHandler = (e) => {
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transaction.id
        ? transaction.id
        : Math.floor(Math.random() * 100000000),
      text: transaction.text,
      amount: +transaction.amount,
    };
    transaction.id
      ? updateTransaction(newTransaction)
      : addTransaction(newTransaction);
    setTransaction({ text: "", amount: 0 });
  };
  return (
    <>
      <h3>{formTrans.id ? "Update transaction" : "Add new transaction"}</h3>
      <form id="form" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            value={transaction.text}
            onChange={(e) => onChangeHandler(e)}
            type="text"
            id="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            value={transaction.amount}
            onChange={(e) => onChangeHandler(e)}
            type="number"
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn"> {formTrans.id ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default TransactionForm;
