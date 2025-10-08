'use client';

import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';
import { addDays } from 'date-fns';
import Image from 'next/image';
import {
  useGetWorkspaceQuery,
  useGetWorkspaceByIdQuery,
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceEmployeesQuery,
} from '@/services/maestri/enhanced-api';
import { useCurrentWorkspace } from '@/features/workspace/hooks/useCurrentWorkspace';
import { PlaceholderCell } from './_components/PlaceholderCell';
import { useInfiniteScroll } from './_hooks/useInfiniteScroll';

type DayInfo = {
  date: Date;
  dayNum: string;
  weekday: string;
  dateString: string;
  loaded: boolean;
};

const DAYS_PER_FETCH = 30;

export default function Schedule() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [loadedEndDate, setLoadedEndDate] = useState(() => {
    const today = new Date();
    return addDays(today, DAYS_PER_FETCH);
  });

  // Fetch workspace and employees
  const workspaceQuery = useGetWorkspaceQuery();
  const fullWorkspaceQuery = useGetWorkspaceByIdQuery(
    { id: currentWorkspaceId! },
    { skip: !currentWorkspaceId }
  );
  const workspaceEmployees = useGetWorkspaceEmployeesQuery(undefined, {
    skip: !fullWorkspaceQuery.isSuccess,
  });

  // Calculate period for loaded data
  const period = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return {
      start: start.toISOString(),
      end: loadedEndDate.toISOString(),
    };
  }, [loadedEndDate]);

  // Build owners array
  const owners = React.useMemo(() => {
    const result: string[] = [];
    if (currentWorkspaceId) {
      result.push(`salon:${currentWorkspaceId}`);
    }
    if (workspaceEmployees.data && Array.isArray(workspaceEmployees.data)) {
      const employeeOwners = workspaceEmployees.data.map((e) => `employee:${e.id}`);
      result.push(...employeeOwners);
    }
    return result;
  }, [workspaceEmployees.data, currentWorkspaceId]);

  // Fetch schedules
  const scheduleQuery = useGetTimetablesSchedulesQuery(
    { period, owners },
    {
      skip:
        !fullWorkspaceQuery.isSuccess ||
        (!workspaceEmployees.isSuccess && !workspaceEmployees.isError) ||
        owners.length === 0,
    }
  );

  // Generate visible days (loaded + placeholder)
  const visibleDays = useMemo<DayInfo[]>(() => {
    const days: DayInfo[] = [];
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      weekday: 'short',
    });

    // Calculate total days to show (loaded + placeholder)
    const daysSinceStart = Math.ceil((loadedEndDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = daysSinceStart + DAYS_PER_FETCH;

    for (let i = 0; i < totalDays; i++) {
      const date = addDays(start, i);
      const formatted = dateFormatter.formatToParts(date);
      const dayNum = formatted.find((p) => p.type === 'day')?.value || '';
      const weekday = formatted.find((p) => p.type === 'weekday')?.value || '';

      days.push({
        date,
        dayNum,
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        dateString: date.toISOString().split('T')[0],
        loaded: date < loadedEndDate, // Mark as loaded if before loadedEndDate
      });
    }

    return days;
  }, [loadedEndDate]);

  // Handle infinite scroll - load more data
  const handleLoadMore = useCallback(() => {
    if (scheduleQuery.isFetching) return;

    setLoadedEndDate((prev) => addDays(prev, DAYS_PER_FETCH));
  }, [scheduleQuery.isFetching]);

  // Intersection observer ref
  const observerTarget = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    isLoading: scheduleQuery.isFetching,
    threshold: 0.8,
  });

  // Find the last loaded day index
  const lastLoadedIndex = visibleDays.findIndex((day) => !day.loaded) - 1;

  const getScheduleForOwner = (ownerId: string, date: string) => {
    if (!scheduleQuery.data) return null;

    const ownerSchedule = scheduleQuery.data.find((s) => s.owner === ownerId);
    if (!ownerSchedule) return null;

    const daySchedule = ownerSchedule.intervals?.find((interval) => {
      const intervalDate = new Date(interval.start).toISOString().split('T')[0];
      return intervalDate === date;
    });

    if (!daySchedule) return null;

    const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
    };

    return `${formatTime(daySchedule.start)}-${formatTime(daySchedule.end)}`;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getCellStyling = (
    schedule: string | null,
    date: Date,
    isExplicitDayOff: boolean = false
  ) => {
    const isPast = isPastDate(date);
    const baseClasses =
      'px-3 py-2 min-h-[60px] flex items-center justify-center relative transition-all text-xs';

    if (isExplicitDayOff) {
      if (isPast) {
        return `${baseClasses} bg-gray-50/80 ring-1 ring-inset ring-red-300/60 text-red-400/70`;
      }
      return `${baseClasses} bg-gray-50 ring-1 ring-inset ring-red-400 text-red-500`;
    }

    if (schedule && schedule !== 'dayoff') {
      if (isPast) {
        return `${baseClasses} bg-white/70 text-gray-500`;
      }
      return `${baseClasses} bg-white text-gray-900 hover:bg-gray-50/50`;
    }

    if (isPast) {
      return `${baseClasses} bg-gray-100/70 text-gray-400`;
    }
    return `${baseClasses} bg-gray-100 text-gray-500`;
  };

  const workspaces = workspaceQuery.data || [];
  const workspace = workspaces.find((w) => w.id === currentWorkspaceId);
  const employees = workspaceEmployees.data || [];

  const gridColumns = `200px repeat(${visibleDays.length}, minmax(80px, 1fr))`;

  return (
    <main className="min-w-full flex flex-col">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Расписание (Infinite Scroll)</h1>
        </div>
      </div>

      <div className="overflow-x-auto px-6 py-4 bg-gray-50">
        <div className="min-w-max bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header row with date cells */}
          <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
            <div className="sticky left-0 z-10 bg-white border-r border-gray-300">
              <div className="p-3 flex items-center gap-2.5 w-full min-h-[60px]">
                {workspace?.logo ? (
                  <Image
                    src={workspace.logo}
                    alt={workspace?.name || 'Salon'}
                    width={36}
                    height={36}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">С</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {workspace?.name || 'Салон'}
                  </span>
                </div>
              </div>
            </div>

            {visibleDays.map((day, index) => {
              if (!day.loaded) {
                // Placeholder for unloaded dates (first row shows headers still)
                return (
                  <div
                    key={day.dateString}
                    className="px-3 py-2 min-h-[60px] flex flex-col items-center justify-center border-b border-r border-gray-200 bg-gray-50"
                  >
                    <div className="text-[10px] text-gray-400 mb-0.5">{day.weekday}</div>
                    <div className="font-semibold text-sm text-gray-400 mb-1">{day.dayNum}</div>
                  </div>
                );
              }

              const schedule = getScheduleForOwner(`salon:${currentWorkspaceId}`, day.dateString);
              const isWeekendDay = isWeekend(day.date);
              const isExplicitDayOff = !schedule && isWeekendDay;
              const cellClass = getCellStyling(schedule, day.date, isExplicitDayOff);
              const isPast = isPastDate(day.date);

              // Add ref to the last loaded cell
              const isLastLoaded = index === lastLoadedIndex;

              return (
                <div
                  key={day.dateString}
                  ref={isLastLoaded ? observerTarget : null}
                  className={`${cellClass} flex-col border-b border-r border-gray-200`}
                >
                  <div
                    className={`text-[10px] ${isPast ? 'text-gray-400' : isWeekendDay ? 'text-red-400' : 'text-gray-500'} mb-0.5`}
                  >
                    {day.weekday}
                  </div>
                  <div
                    className={`font-semibold text-sm ${isPast ? 'text-gray-500' : 'text-gray-900'} mb-1`}
                  >
                    {day.dayNum}
                  </div>
                  <div
                    className={`text-[11px] ${schedule ? 'font-medium' : isExplicitDayOff ? 'text-red-500 font-medium' : ''}`}
                  >
                    {schedule || (isExplicitDayOff ? 'Вых.' : '')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Employee rows */}
          <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
            {employees.map((employee) => (
              <React.Fragment key={employee.id}>
                <div className="sticky left-0 z-10 bg-white border-r border-gray-300 border-b border-gray-200">
                  <div className="p-3 flex items-center gap-2.5 w-full min-h-[60px]">
                    {employee.avatar ? (
                      <Image
                        src={employee.avatar}
                        alt={employee.nickname || 'Employee'}
                        width={36}
                        height={36}
                        className="rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          {(employee.nickname || 'E')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm text-gray-900 truncate">
                        {employee.nickname}
                      </span>
                      {employee.position?.title && (
                        <span className="text-xs text-gray-500 truncate">
                          {employee.position.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {visibleDays.map((day) => {
                  if (!day.loaded) {
                    // Gray placeholder for unloaded employee schedule
                    return <PlaceholderCell key={`${employee.id}-${day.dateString}`} />;
                  }

                  const schedule = getScheduleForOwner(`employee:${employee.id}`, day.dateString);
                  const isWeekendDay = isWeekend(day.date);
                  const isExplicitDayOff = !schedule && isWeekendDay;
                  const cellClass = getCellStyling(schedule, day.date, isExplicitDayOff);

                  return (
                    <div
                      key={`${employee.id}-${day.dateString}`}
                      className={`${cellClass} border-b border-r border-gray-200`}
                    >
                      <div
                        className={`text-[11px] ${schedule ? 'font-medium' : isExplicitDayOff ? 'text-red-500 font-medium' : ''}`}
                      >
                        {schedule || (isExplicitDayOff ? 'Вых.' : '')}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        {scheduleQuery.isFetching && (
          <div className="flex justify-center items-center py-4">
            <div className="text-sm text-gray-500">Загрузка...</div>
          </div>
        )}
      </div>
    </main>
  );
}
