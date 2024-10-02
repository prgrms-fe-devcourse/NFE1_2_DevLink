import store from "./store";

export interface ReduxProviderProps {
  children: React.ReactNode;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
