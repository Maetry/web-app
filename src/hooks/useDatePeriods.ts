import { useMemo, useState } from 'react';
import { addDays, eachDayOfInterval, startOfDay } from 'date-fns';
import { utc } from '@date-fns/utc';

const PERIOD_SIZE = 30;

export const useDatePeriods = () => {
  const [currentRange, setCurrentRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: addDays(new Date(), PERIOD_SIZE - 1),
  });

  const loadNextPeriod = () => {
    setCurrentRange((prev) => ({
      ...prev,
      end: addDays(prev.end, PERIOD_SIZE),
    }));
  };

  const jumpToDate = (newStartDate: Date) => {
    setCurrentRange({
      start: newStartDate,
      end: addDays(newStartDate, PERIOD_SIZE - 1),
    });
  };

  const datePeriods = useMemo(() => {
    const periods: string[][] = [];
    let currentPeriod: string[] = [];

    const allDays = eachDayOfInterval({
      start: currentRange.start,
      end: currentRange.end,
    });

    allDays.forEach((day) => {
      currentPeriod.push(startOfDay(day, { in: utc }).toISOString());

      if (currentPeriod.length === PERIOD_SIZE) {
        periods.push(currentPeriod);
        currentPeriod = [];
      }
    });

    // Add the last partial period if it exists
    if (currentPeriod.length > 0) {
      periods.push(currentPeriod);
    }

    return periods;
  }, [currentRange]);

  return {
    datePeriods,
    loadNextPeriod,
    jumpToDate,
    currentRange,
  };
};
