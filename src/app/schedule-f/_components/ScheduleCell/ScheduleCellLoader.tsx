import { useEntityScheduleById } from '@/features/schedules/hooks/useEntityScheduleById';
import { ScheduleCellDisplay } from './ScheduleCellDisplay';

type ScheduleCellLoaderProps = {
  id: string;
  isEditing?: boolean;
};

export const ScheduleCellLoader = ({ id, isEditing }: ScheduleCellLoaderProps) => {
  const scheduleItem = useEntityScheduleById(id);

  const schedule = scheduleItem
    ? {
        status: 'working' as const,
        workingHours: [scheduleItem.start, scheduleItem.end] as [string, string],
      }
    : { status: 'day-off' as const };

  const isInPast = scheduleItem ? new Date(scheduleItem.end) < new Date() : false;

  return <ScheduleCellDisplay schedule={schedule} isInPast={isInPast} isEditing={isEditing} />;
};
