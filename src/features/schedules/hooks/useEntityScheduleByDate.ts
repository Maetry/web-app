import { useAppSelector } from '@/store/hooks';
import { scheduleSelectors } from '@/features/schedules/schedules.reducer';

export type UseEntityScheduleByDateParams = {
  entity: 'salon' | 'employee';
  id: string;
  date: string;
};

export const useEntityScheduleByDate = ({ date, entity, id }: UseEntityScheduleByDateParams) => {
  const schedule = useAppSelector((state) =>
    scheduleSelectors.selectById(state.schedules, `${entity}:${id}:${date}`),
  );

  return schedule;
};
