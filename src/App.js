import React from "react";
import "./App.css";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpences from "./components/IncomeExpences";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="conatiner">
        <Balance />
        <IncomeExpences />
        <TransactionList />
        <TransactionForm />
      </div>
    </GlobalProvider>
  );
}

export default App;
