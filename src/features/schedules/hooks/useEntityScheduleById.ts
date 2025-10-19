import { useAppSelector } from '@/store/hooks';
import { scheduleSelectors } from '@/features/schedules/schedules.reducer';
import { useDebugValue } from 'react';

export const useEntityScheduleById = (id: string) => {
  const schedule = useAppSelector((state) => scheduleSelectors.selectById(state.schedules, id));

  useDebugValue(schedule);

  return schedule;
};
