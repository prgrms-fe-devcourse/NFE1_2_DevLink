import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "../features/redux/type";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
