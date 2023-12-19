import { useTransactionsSelector } from "../store/hooks";
import { useEffect, useState } from "react";

// custom hook to get monthly income and expense
const useMonthlySummary = () => {
  const { transactionsEntities } = useTransactionsSelector();
  const [transactionMounts, setTransactionsMount] = useState({
    monthlyIncomeSummary: 0,
    monthlyExpenseSummary: 0,
  });
  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactionsEntities
      .filter(
        (trans) => new Date(trans.date).getMonth() === new Date().getMonth()
      )
      .map((transaction) => {
        if (transaction.transactionType === "income") {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });
    setTransactionsMount((prev) => ({
      ...prev,
      monthlyIncomeSummary: income,
      monthlyExpenseSummary: expense,
    }));
  }, [transactionsEntities]);

  return {
    monthlyIncomeSummary: transactionMounts.monthlyIncomeSummary,
    monthlyExpenseSummary: transactionMounts.monthlyExpenseSummary,
  };
};

export default useMonthlySummary;
