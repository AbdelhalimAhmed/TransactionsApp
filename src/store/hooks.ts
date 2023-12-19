import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./index";

export const useTransactionsSelector = () =>
  useSelector((state: RootState) => state.transactions);

export const useAppDispatch = () => useDispatch<AppDispatch>();
