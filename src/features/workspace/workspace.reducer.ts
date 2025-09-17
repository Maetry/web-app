import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceState {
  currentWorkspaceId: string | null;
}

const initialState = { currentWorkspaceId: null } satisfies WorkspaceState as WorkspaceState;

export const workspaceReducer = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCurrentWorkspaceId(
      state,
      action: PayloadAction<{ currentWorkspaceId: WorkspaceState['currentWorkspaceId'] }>,
    ) {
      state.currentWorkspaceId = action.payload.currentWorkspaceId;
    },
    clearCurrentWorkspaceId(state) {
      state.currentWorkspaceId = null;
    },
  },
});

export const { setCurrentWorkspaceId, clearCurrentWorkspaceId } = workspaceReducer.actions;
