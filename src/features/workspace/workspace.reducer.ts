import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { enhancedApi } from '@/services/maestri/enhanced-api';
import type { WorkspaceResponsesPartial } from '@/services/maestri/api-generated';

interface WorkspaceSettings {
  id: string;
  minStart: string;
  maxEnd: string;
}

const workspaceAdapter = createEntityAdapter<WorkspaceResponsesPartial>();
const settingsAdapter = createEntityAdapter<WorkspaceSettings>();

export const workspaceSelectors = workspaceAdapter.getSelectors();
export const settingsSelectors = settingsAdapter.getSelectors();

interface WorkspaceState {
  current: string | null;
  settings: ReturnType<typeof settingsAdapter.getInitialState>;
  items: ReturnType<typeof workspaceAdapter.getInitialState>;
}

const initialState: WorkspaceState = {
  current: null,
  settings: settingsAdapter.getInitialState(),
  items: workspaceAdapter.getInitialState(),
};

const calculateDateRange = (workspaceId: string): WorkspaceSettings => {
  const today = new Date();
  const minStart = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString();
  const maxEnd = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString();

  return {
    id: workspaceId,
    minStart,
    maxEnd,
  };
};

export const workspaceReducer = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCurrentWorkspaceId(
      state,
      action: PayloadAction<{ currentWorkspaceId: string | null }>,
    ) {
      state.current = action.payload.currentWorkspaceId;
    },
    clearCurrentWorkspaceId(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        enhancedApi.endpoints.getWorkspace.matchFulfilled,
        (state, action) => {
          workspaceAdapter.setAll(state.items, action.payload);

          // Create settings for each workspace
          const workspaceSettings = action.payload.map((workspace) =>
            calculateDateRange(workspace.id)
          );
          settingsAdapter.setAll(state.settings, workspaceSettings);
        },
      )
      .addMatcher(
        enhancedApi.endpoints.getWorkspaceById.matchFulfilled,
        (state, action) => {
          workspaceAdapter.upsertOne(state.items, action.payload);

          // Upsert settings for this workspace
          settingsAdapter.upsertOne(state.settings, calculateDateRange(action.payload.id));
        },
      );
  },
});

export const { setCurrentWorkspaceId, clearCurrentWorkspaceId } = workspaceReducer.actions;
