import { useAppSelector } from '@/store/hooks';
import { scheduleSelectors } from '@/features/schedules/schedules.reducer';

export const useEntityScheduleById = (id: string) => {
  return useAppSelector((state) => scheduleSelectors.selectById(state.schedules, id));
};
