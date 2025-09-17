import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { authStorage } from '@/features/auth/auth.storage';

export const MAESTRI_SERVICE_NAME = '_maestri';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'omit',
  mode: 'cors',
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  prepareHeaders: (headers, api) => {
    const deviceId = authStorage.getDeviceId();
    const employeeTokenJson = authStorage.getEmployeeTokenAsJson();
    const accessTokenJson = authStorage.getAccessTokenAsJson();

    if (deviceId) {
      headers.set('Device-ID', deviceId);
    }

    // Use employeeToken if available, otherwise use accessToken
    const tokenToUse = employeeTokenJson || accessTokenJson;

    if (tokenToUse) {
      headers.set('Authorization', `Bearer ${JSON.parse(tokenToUse).value}`);
    }

    // Some endpoints don't require authentication - but getTimetablesSchedules needs auth for workspace data
    if (api.endpoint === 'getTimetablesSchedules') {
      headers.delete('Authorization');
    }

    return headers;
  },
});

export const api = createApi({
  baseQuery,
  reducerPath: MAESTRI_SERVICE_NAME,
  tagTypes: ['TimetablesSchedules', 'WorkspaceEmployees', 'Workspace'],
  endpoints: () => ({}),
});
