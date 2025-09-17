import type { ReactNode } from 'react';

export type ScheduleCellProps = {
  children: ReactNode;
  type: 'day off' | 'editing';
  isPast: boolean;
};

export const ScheduleCell = ({}: ScheduleCellProps) => {
  return <div></div>;
};
