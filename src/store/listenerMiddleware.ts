import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@/store/types';
import { setCurrentWorkspaceId } from '@/features/workspace/workspace.reducer';
import { api } from '@/services/maestri/reducer';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

// Listen for workspace changes and invalidate related cache
startAppListening({
  actionCreator: setCurrentWorkspaceId,
  effect: async (action, listenerApi) => {
    // Invalidate schedule-related queries when workspace changes
    // This will cause them to refetch automatically
    listenerApi.dispatch(
      api.util.invalidateTags([
        { type: 'TimetablesSchedules', id: 'LIST' },
        { type: 'WorkspaceEmployees', id: 'LIST' },
        { type: 'Workspace', id: action.payload.currentWorkspaceId || 'LIST' },
      ]),
    );
  },
});
