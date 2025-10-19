import { _api } from './api-generated';
import { authStorage } from '@/features/auth/auth.storage';

export const api = _api.enhanceEndpoints({
  endpoints: {
    getWorkspaceById: {
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data: workspace } = await queryFulfilled;

          if (workspace?.employeeToken) {
            authStorage.setEmployeeToken(workspace.employeeToken);
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  },
});

export const {
  useGetWorkspaceQuery,
  useGetWorkspaceByIdQuery,
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceEmployeesQuery,
  usePostTimetablesByOwnerByForceMutation,
} = api;
