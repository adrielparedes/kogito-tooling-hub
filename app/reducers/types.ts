import { Action, Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
