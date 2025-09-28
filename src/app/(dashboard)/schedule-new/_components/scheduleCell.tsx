import React, { ReactNode } from 'react';
import { useEntityScheduleById } from '@/features/schedules/hooks/useEntityScheduleById';

export type ScheduleCellProps = {
  children: ReactNode;
  date: string;
  id: string;
  entity: 'salon' | 'employee';
  isPast: boolean;
  type?: 'disabled' | 'selected' | 'initial';
};

export const ScheduleCell = ({ children, date, entity, id, isPast, type }: ScheduleCellProps) => {
  const schedule = useEntityScheduleById(`${entity}:${id}:${date}`);
  return (
    <div>
      <>
        {new Date(schedule.start).toLocaleTimeString('ru', {
          hour: '2-digit',
          minute: '2-digit',
        })}
        <br /> - <br />
        {new Date(schedule.end).toLocaleTimeString('ru', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </>
    </div>
  );
};
