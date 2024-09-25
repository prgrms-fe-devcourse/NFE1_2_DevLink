import { Provider } from "react-redux";

import store from "./store";
import { ReduxProviderProps } from "./type";

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
