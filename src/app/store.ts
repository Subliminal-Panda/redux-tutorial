import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const CountReducer = (state = 0, action: any) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    count: CountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
