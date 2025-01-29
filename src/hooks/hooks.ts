import { AppDispatch, RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();