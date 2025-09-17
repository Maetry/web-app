import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { enhancedApi } from '@/services/maestri/enhanced-api';

const scheduleAdapter = createEntityAdapter<{
  id: string;
  owner: string;
  start: string;
  end: string;
}>();

export const scheduleSelectors = scheduleAdapter.getSelectors();

export const schedulesReducer = createSlice({
  name: 'schedules',
  initialState: scheduleAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      enhancedApi.endpoints.getTimetablesSchedules.matchFulfilled,
      (state, action) => {
        scheduleAdapter.upsertMany(
          state,
          action.payload.reduce((acc, entityTimetable) => {
            entityTimetable.intervals.forEach((entityInterval) => {
              acc.push({
                id: `${entityTimetable.owner}:${entityInterval.start.slice(0, 10)}`,
                owner: entityTimetable.owner,
                start: entityInterval.start,
                end: entityInterval.end,
              });
            });

            return acc;
          }, [] as any),
        );
      },
    );
  },
});

export const {} = schedulesReducer.actions;
