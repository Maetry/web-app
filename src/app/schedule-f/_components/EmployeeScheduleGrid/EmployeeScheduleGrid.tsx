'use client';

import { useMemo } from 'react';
import { eachDayOfInterval } from 'date-fns';
import { useGetTimetablesSchedulesQuery } from '@/services/maestri/enhanced-api';
import type { EmployeeResponsesPartial } from '@/services/maestri/api-generated';
import { ScheduleCellLoader } from '../ScheduleCell/ScheduleCellLoader';

type EmployeeScheduleGridProps = {
  employee: EmployeeResponsesPartial;
  datePeriods: string[][];
};

export const EmployeeScheduleGrid = ({ employee, datePeriods }: EmployeeScheduleGridProps) => {
  const { start, end, allDates } = useMemo(() => {
    if (datePeriods.length === 0) {
      return { start: '', end: '', allDates: [] };
    }

    const firstDate = datePeriods[0][0];
    const lastPeriod = datePeriods[datePeriods.length - 1];
    const lastDate = lastPeriod[lastPeriod.length - 1];

    const dates = eachDayOfInterval({
      start: firstDate,
      end: lastDate,
    });

    return { start: firstDate, end: lastDate, allDates: dates };
  }, [datePeriods]);

  // Fetch schedules for entire range for this employee
  useGetTimetablesSchedulesQuery(
    {
      owners: [`employee:${employee.id}`],
      period: { start, end },
    },
    {
      skip: !start || !end,
    },
  );

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2">{employee.nickname}</h3>
      <div className="flex gap-2 flex-wrap">
        {allDates.map((date) => {
          const dateKey = date.toISOString().split('T')[0];
          const scheduleId = `employee:${employee.id}:${dateKey}`;
          return (
            <div key={dateKey} className="w-24">
              <div className="text-xs text-gray-500">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <ScheduleCellLoader id={scheduleId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
