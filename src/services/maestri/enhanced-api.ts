import { _api } from './api-generated';

export const api = _api;

export const {
  useGetWorkspaceQuery,
  useGetWorkspaceByIdQuery,
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceEmployeesQuery,
  usePostTimetablesByOwnerByForceMutation,
} = api;
