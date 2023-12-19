import { useSelector, useDispatch, DispatchProp } from "react-redux";
import { RootState, AppDispatch } from "./index";

export const useTransactionsSelector = () =>
  useSelector((state: RootState) => state.transactions);

// type TypedDispatch = DispatchProp<AppDispatch >
export const useAppDispatch = () => useDispatch<AppDispatch>();
