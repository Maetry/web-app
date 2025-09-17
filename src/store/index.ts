import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from '@/store/listenerMiddleware';
import { api } from '@/services/maestri/reducer';
import { workspaceReducer } from '@/features/workspace/workspace.reducer';
import { schedulesReducer } from '@/features/schedules/schedules.reducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [workspaceReducer.name]: workspaceReducer.reducer,
      [schedulesReducer.name]: schedulesReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware, api.middleware),
  });
};
