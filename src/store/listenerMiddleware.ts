import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';

import { api } from '@/services/maestri/enhanced-api';
import { initializeApp } from '@/features/common/common.actions';

import type { AppDispatch, RootState } from '@/store/types';
import { setCurrentWorkspaceId } from '@/features/workspace/workspace.reducer';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

listenerMiddleware.startListening({
  actionCreator: initializeApp,
  effect: async (_, { dispatch, getState }) => {
    try {
      const workspaces = await dispatch(api.endpoints.getWorkspace.initiate()).unwrap();
      const state = getState() as RootState;
      const id = workspaces[0]?.id;

      if (id && !state.workspace.current) {
        dispatch(setCurrentWorkspaceId({ id }));
      }

      dispatch(api.endpoints.getUsers.initiate());
      dispatch(api.endpoints.getWorkspaceById.initiate({ id }));
    } catch (error) {
      console.log(error);
    }
  },
});
