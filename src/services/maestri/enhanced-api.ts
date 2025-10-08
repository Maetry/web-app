import { setCurrentWorkspaceId } from '@/features/workspace/workspace.reducer';
import { RootState } from '@/store/types';
import { authStorage } from '@/features/auth/auth.storage';
import { _api } from './api-generated';

export const enhancedApi = _api.enhanceEndpoints({
  endpoints: {
    getWorkspace: {
      providesTags: ['Workspace'],
      onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
        try {
          const { data: workspaces } = await queryFulfilled;
          const state = getState() as RootState;

          // Synchronously set current workspace if null and workspaces exist
          if (workspaces.length > 0 && state.workspace.current === null) {
            dispatch(setCurrentWorkspaceId({ currentWorkspaceId: workspaces[0].id }));
          }
        } catch {
          // Handle query failure if needed
        }
      },
    },
    getWorkspaceById: {
      providesTags: (result, error, arg) => [{ type: 'Workspace', id: arg.id }],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data: workspace } = await queryFulfilled;

          // Store the employee token when full workspace is fetched
          if (workspace?.employeeToken) {
            authStorage.setEmployeeToken(workspace.employeeToken);
          }
        } catch {
          // Handle query failure if needed
        }
      },
    },
    getTimetablesSchedules: {
      providesTags: ['TimetablesSchedules'],
    },
    getWorkspaceEmployees: {
      providesTags: ['WorkspaceEmployees'],
    },
  },
});

export const {
  useGetWorkspaceQuery,
  useGetWorkspaceByIdQuery,
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceEmployeesQuery,
  usePostTimetablesByOwnerByForceMutation,
} = enhancedApi;
