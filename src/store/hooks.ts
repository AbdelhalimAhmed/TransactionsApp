import { useSelector, useDispatch, DispatchProp } from "react-redux";
import { RootState, AppDispatch } from "./index";

export const useSymptomsSelector = () =>
  useSelector((state: RootState) => state.symptoms);

// type TypedDispatch = DispatchProp<AppDispatch >
export const useAppDispatch = () => useDispatch<AppDispatch>();
