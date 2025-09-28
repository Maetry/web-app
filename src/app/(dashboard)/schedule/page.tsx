'use client';

import * as React from 'react';
import {
  useGetWorkspaceQuery,
  useGetWorkspaceByIdQuery,
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceEmployeesQuery,
  usePostTimetablesByOwnerByForceMutation,
} from '@/services/maestri/enhanced-api';
import { useMemo } from 'react';
import { useCurrentWorkspace } from '@/features/workspace/hooks/useCurrentWorkspace';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import {
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronDown,
  X,
  Plus,
  Clock,
} from 'lucide-react';
import type {
  SchedulePattern,
  TimetableParametersCreatePattern,
  ScheduleWeek,
  ScheduleDay,
} from '@/services/maestri/api-generated';

type WeekDays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type ScheduleFormData = {
  startTime: string;
  endTime: string;
  selectedDate?: Date;
  selectedWeekdays: Set<WeekDays>;
};

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());
  const [hiddenEmployees, setHiddenEmployees] = React.useState<Set<string>>(new Set());
  const [scheduleModalOpen, setScheduleModalOpen] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState<{
    id: string;
    name: string;
    avatar?: string | null;
    position?: string | null;
    type: 'employee' | 'salon';
  } | null>(null);
  const [isWeeklySchedule, setIsWeeklySchedule] = React.useState(true);
  const [isDayOff, setIsDayOff] = React.useState(false);
  const [breaks, setBreaks] = React.useState<Array<{ id: string; start: string; end: string }>>([]);
  const [monthPickerYear, setMonthPickerYear] = React.useState(() => new Date().getFullYear());
  const [scheduleFormData, setScheduleFormData] = React.useState<ScheduleFormData>({
    startTime: '09:00',
    endTime: '18:00',
    selectedDate: new Date(),
    selectedWeekdays: new Set(['monday', 'wednesday']),
  });
  const { currentWorkspaceId } = useCurrentWorkspace();

  // Log when currentWorkspaceId changes
  React.useEffect(() => {
    console.log('currentWorkspaceId changed:', currentWorkspaceId);
  }, [currentWorkspaceId]);

  const workspaceQuery = useGetWorkspaceQuery();
  const [postSchedule, { isLoading: isSavingSchedule }] = usePostTimetablesByOwnerByForceMutation();

  // Log workspace query results
  React.useEffect(() => {
    if (workspaceQuery.data) {
      console.log('Workspaces fetched:', {
        count: workspaceQuery.data.length,
        firstWorkspaceId: workspaceQuery.data[0]?.id,
        data: workspaceQuery.data,
      });
    }
  }, [workspaceQuery.data]);

  // Step 1: Fetch full workspace details (this stores employeeToken in localStorage)
  const fullWorkspaceQuery = useGetWorkspaceByIdQuery(
    { id: currentWorkspaceId! },
    { skip: !currentWorkspaceId },
  );

  // Step 2: Fetch employees after workspace is successfully fetched
  const workspaceEmployees = useGetWorkspaceEmployeesQuery(undefined, {
    skip: !fullWorkspaceQuery.isSuccess,
  });

  const period = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const start = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    const end = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0, 0));

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }, [selectedDate]);

  // Step 3: Build owners array for schedule query
  const owners = React.useMemo(() => {
    const result: string[] = [];

    console.log('Building owners array:', {
      currentWorkspaceId,
      hasEmployeesData: !!workspaceEmployees.data,
      employeesDataLength: workspaceEmployees.data?.length,
      isEmployeesArray: Array.isArray(workspaceEmployees.data),
    });

    // Add salon owner if we have workspace ID
    if (currentWorkspaceId) {
      result.push(`salon:${currentWorkspaceId}`);
      console.log('Added salon owner:', `salon:${currentWorkspaceId}`);
    } else {
      console.log('No currentWorkspaceId available');
    }

    // Add employee owners if we have employee data
    if (workspaceEmployees.data && Array.isArray(workspaceEmployees.data)) {
      const employeeOwners = workspaceEmployees.data.map((e) => `employee:${e.id}`);
      result.push(...employeeOwners);
      console.log('Added employee owners:', employeeOwners);
    } else {
      console.log('No employee data available or not an array');
    }

    console.log('Final owners array:', result);
    return result;
  }, [workspaceEmployees.data, currentWorkspaceId]);

  // Step 4: Fetch schedules after we have workspace and employees query has completed
  const scheduleQuery = useGetTimetablesSchedulesQuery(
    {
      period,
      owners,
    },
    {
      // Wait for workspace to be fetched and employees query to complete (success or error)
      skip:
        !fullWorkspaceQuery.isSuccess ||
        (!workspaceEmployees.isSuccess && !workspaceEmployees.isError) ||
        owners.length === 0,
    },
  );

  // Debug logging
  React.useEffect(() => {
    console.log('Schedule Fetching Sequence:', {
      step1_workspace: {
        currentWorkspaceId,
        fullWorkspaceQuery: {
          isSuccess: fullWorkspaceQuery.isSuccess,
          isLoading: fullWorkspaceQuery.isLoading,
          isError: fullWorkspaceQuery.isError,
          error: fullWorkspaceQuery.error,
          data: fullWorkspaceQuery.data,
        },
      },
      step2_employees: {
        isSuccess: workspaceEmployees.isSuccess,
        isLoading: workspaceEmployees.isLoading,
        isError: workspaceEmployees.isError,
        error: workspaceEmployees.error,
        data: workspaceEmployees.data,
        dataLength: workspaceEmployees.data?.length || 0,
        skip: !fullWorkspaceQuery.isSuccess,
      },
      step3_owners: {
        owners,
        ownersLength: owners.length,
      },
      step4_schedules: {
        isLoading: scheduleQuery.isLoading,
        isError: scheduleQuery.isError,
        isSuccess: scheduleQuery.isSuccess,
        error: scheduleQuery.error,
        data: scheduleQuery.data,
        dataLength: scheduleQuery.data?.length || 0,
        skip:
          !fullWorkspaceQuery.isSuccess ||
          (!workspaceEmployees.isSuccess && !workspaceEmployees.isError) ||
          owners.length === 0,
        employeesQueryStatus: {
          isSuccess: workspaceEmployees.isSuccess,
          isError: workspaceEmployees.isError,
          isLoading: workspaceEmployees.isLoading,
        },
        period,
      },
    });
  }, [scheduleQuery, workspaceEmployees, fullWorkspaceQuery, currentWorkspaceId, period, owners]);

  const monthDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      weekday: 'short',
    });

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const formatted = dateFormatter.formatToParts(date);
      const dayNum = formatted.find((p) => p.type === 'day')?.value || '';
      const weekday = formatted.find((p) => p.type === 'weekday')?.value || '';

      days.push({
        date,
        dayNum,
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        dateString: date.toISOString().split('T')[0],
      });
    }

    return days;
  }, [selectedDate]);

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

  // Helper function to check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Helper function to check if it's a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  // Helper function to determine cell styling based on schedule
  const getCellStyling = (
    schedule: string | null,
    date: Date,
    isExplicitDayOff: boolean = false,
  ) => {
    const isPast = isPastDate(date);
    const baseClasses =
      'px-3 py-2 min-h-[60px] flex items-center justify-center relative transition-all text-xs';

    // Day off - grey with red outline
    if (isExplicitDayOff) {
      if (isPast) {
        return `${baseClasses} bg-gray-50/80 ring-1 ring-inset ring-red-300/60 text-red-400/70`;
      }
      return `${baseClasses} bg-gray-50 ring-1 ring-inset ring-red-400 text-red-500`;
    }

    // Has working hours
    if (schedule && schedule !== 'dayoff') {
      if (isPast) {
        return `${baseClasses} bg-white/70 text-gray-500`;
      }
      return `${baseClasses} bg-white text-gray-900 hover:bg-gray-50/50`;
    }

    // No schedule - just grey
    if (isPast) {
      return `${baseClasses} bg-gray-100/70 text-gray-400`;
    }
    return `${baseClasses} bg-gray-100 text-gray-500`;
  };

  const workspaces = workspaceQuery.data || [];
  const workspace = workspaces.find((w) => w.id === currentWorkspaceId);
  const allEmployees = workspaceEmployees.data || [];
  const employees = allEmployees.filter((emp) => !hiddenEmployees.has(emp.id));

  const handleHideMaster = (employeeId: string) => {
    setHiddenEmployees((prev) => new Set([...prev, employeeId]));
  };

  const handleSetSalonSchedule = (type: 'daily' | 'weekly' | 'custom') => {
    setSelectedEntity({
      id: currentWorkspaceId || '',
      name: workspace?.name || 'Салон',
      avatar: workspace?.logo,
      position: null,
      type: 'salon',
    });
    setIsWeeklySchedule(type === 'weekly' || type === 'custom');
    setIsDayOff(false);
    setScheduleFormData({
      startTime: '09:00',
      endTime: '18:00',
      selectedDate: new Date(),
      selectedWeekdays: new Set(['monday', 'wednesday']),
    });
    setBreaks([]);
    setScheduleModalOpen(true);
  };

  const toggleEmployeeVisibility = (employeeId: string) => {
    setHiddenEmployees((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  };

  const showAllMasters = () => {
    setHiddenEmployees(new Set());
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(monthPickerYear, month, 1);
    setSelectedDate(newDate);
  };

  const gridColumns = `200px repeat(${monthDays.length}, minmax(80px, 1fr))`;

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const currentMonthName = monthNames[selectedDate.getMonth()];
  const currentYear = selectedDate.getFullYear();

  // Generate time options for dropdowns (00:00 - 23:30 in 30-min intervals)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const toggleWeekday = (day: WeekDays) => {
    setScheduleFormData((prev) => {
      const newWeekdays = new Set(prev.selectedWeekdays);
      if (newWeekdays.has(day)) {
        newWeekdays.delete(day);
      } else {
        newWeekdays.add(day);
      }
      return { ...prev, selectedWeekdays: newWeekdays };
    });
  };

  const handleSaveSchedule = async () => {
    if (!selectedEntity) return;

    const owner =
      selectedEntity.type === 'salon'
        ? `salon:${selectedEntity.id}`
        : `employee:${selectedEntity.id}`;

    // Build schedule pattern
    const workTime = isDayOff ? '' : `${scheduleFormData.startTime}-${scheduleFormData.endTime}`;
    const offTime = isDayOff ? [] : breaks.map((b) => `${b.start}-${b.end}`);

    const weekSchedule: ScheduleWeek = {};
    const daySchedule: ScheduleDay = {
      workTime: isDayOff ? '' : workTime,
      offTime: isDayOff ? [] : offTime,
    };

    if (!isWeeklySchedule) {
      // Apply to all days
      weekSchedule.monday = daySchedule;
      weekSchedule.tuesday = daySchedule;
      weekSchedule.wednesday = daySchedule;
      weekSchedule.thursday = daySchedule;
      weekSchedule.friday = daySchedule;
      weekSchedule.saturday = daySchedule;
      weekSchedule.sunday = daySchedule;
    } else {
      // Apply to selected weekdays
      if (scheduleFormData.selectedWeekdays.has('monday')) weekSchedule.monday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('tuesday')) weekSchedule.tuesday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('wednesday')) weekSchedule.wednesday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('thursday')) weekSchedule.thursday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('friday')) weekSchedule.friday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('saturday')) weekSchedule.saturday = daySchedule;
      if (scheduleFormData.selectedWeekdays.has('sunday')) weekSchedule.sunday = daySchedule;
    }

    const schedulePattern: SchedulePattern = { weekly: weekSchedule };

    // Round date to beginning of day (00:00:00.000)
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const payload: TimetableParametersCreatePattern = {
      startAt: startDate.toISOString().split('Z')[0],
      schedule: schedulePattern,
    };

    try {
      await postSchedule({
        owner,
        force: 'true',
        timetableParametersCreatePattern: payload,
      }).unwrap();

      // Refetch schedules
      scheduleQuery.refetch();

      // Close modal
      setScheduleModalOpen(false);
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  return (
    <main className="min-w-full flex flex-col">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Расписание</h1>

          <div className="flex items-center gap-3">
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Users className="w-4 h-4" />
                  {hiddenEmployees.size > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {hiddenEmployees.size}
                    </span>
                  )}
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                  sideOffset={5}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Мастера</h3>
                    <button
                      onClick={showAllMasters}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Показать всех
                    </button>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {allEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                      >
                        {employee.avatar && (
                          <Image
                            src={employee.avatar}
                            alt={employee.nickname || 'Employee'}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{employee.nickname}</div>
                          <div className="text-xs text-gray-500">
                            {employee.position?.title || ''}
                          </div>
                        </div>
                        <Checkbox.Root
                          className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          checked={!hiddenEmployees.has(employee.id)}
                          onCheckedChange={() => toggleEmployeeVisibility(employee.id)}
                        >
                          <Checkbox.Indicator>
                            <Check className="w-3 h-3 text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {currentMonthName} {currentYear}
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                  sideOffset={5}
                >
                  <h3 className="font-medium mb-3">Выберите месяц</h3>

                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setMonthPickerYear((prev) => prev - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{monthPickerYear}</span>
                    <button
                      onClick={() => setMonthPickerYear((prev) => prev + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {monthNames.map((month, index) => {
                      const isSelected =
                        selectedDate.getMonth() === index &&
                        selectedDate.getFullYear() === monthPickerYear;
                      return (
                        <button
                          key={index}
                          onClick={() => handleMonthSelect(index)}
                          className={`px-3 py-2 text-sm rounded transition-colors ${
                            isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {month.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-6 py-4 bg-gray-50">
        <div className="min-w-max bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
            <div className="sticky left-0 z-10 bg-white border-r border-gray-300">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="p-3 flex items-center gap-2.5 w-full text-left hover:bg-gray-50 transition-colors min-h-[60px]">
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
                      {workspace?.type && (
                        <span className="text-xs text-gray-500 truncate">{workspace.type}</span>
                      )}
                    </div>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[180px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    sideOffset={5}
                  >
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 outline-none transition-colors flex items-center justify-between">
                        Установить расписание
                        <span className="ml-2 text-gray-400">›</span>
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                          className="min-w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                          sideOffset={2}
                          alignOffset={-5}
                        >
                          <DropdownMenu.Item
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 outline-none transition-colors"
                            onSelect={() => handleSetSalonSchedule('daily')}
                          >
                            Ежедневный график
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 outline-none transition-colors"
                            onSelect={() => handleSetSalonSchedule('weekly')}
                          >
                            Шаблон на неделю
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 outline-none transition-colors"
                            onSelect={() => handleSetSalonSchedule('custom')}
                          >
                            Сменный график
                          </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            {monthDays.map((day) => {
              const schedule = getScheduleForOwner(`salon:${currentWorkspaceId}`, day.dateString);
              const isWeekendDay = isWeekend(day.date);
              const isExplicitDayOff = !schedule && isWeekendDay;
              const cellClass = getCellStyling(schedule, day.date, isExplicitDayOff);
              const isPast = isPastDate(day.date);

              return (
                <div
                  key={day.dateString}
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

          <div className="grid" style={{ gridTemplateColumns: gridColumns }}>
            {employees.map((employee) => (
              <React.Fragment key={employee.id}>
                <div className="sticky left-0 z-10 bg-white border-r border-gray-300 border-b border-gray-200">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="p-3 flex items-center gap-2.5 w-full text-left hover:bg-gray-50 transition-colors min-h-[60px]">
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
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[180px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 outline-none transition-colors"
                          onSelect={() => handleHideMaster(employee.id)}
                        >
                          Скрыть мастера
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>

                {monthDays.map((day) => {
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
      </div>

      <Dialog.Root open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-y-auto">
            <Dialog.Title className="text-xl font-semibold mb-6">Настройка графика</Dialog.Title>

            {/* Entity Info (Employee or Salon) */}
            {selectedEntity && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  {selectedEntity.avatar && (
                    <Image
                      src={selectedEntity.avatar}
                      alt={selectedEntity.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    {selectedEntity.type === 'employee' ? (
                      <>
                        <div className="text-xs text-gray-500">
                          {selectedEntity.position || 'Мастер маникюра'}
                        </div>
                        <div className="font-medium">{selectedEntity.name}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs text-gray-500">Салон</div>
                        <div className="font-medium">{selectedEntity.name}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Schedule Toggle */}
            <div className="flex items-center gap-3 mb-6">
              <label className="text-base font-medium flex items-center gap-3 cursor-pointer">
                Недельный график
                <Checkbox.Root
                  className="w-6 h-6 rounded-md bg-blue-600 data-[state=unchecked]:bg-gray-200 flex items-center justify-center transition-colors"
                  checked={isWeeklySchedule}
                  onCheckedChange={(checked) => setIsWeeklySchedule(checked === true)}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </label>
            </div>

            {/* Weekday Selector Pills - Only show when weekly schedule is selected */}
            {isWeeklySchedule && (
              <div className="flex gap-2 mb-6">
                {[
                  { key: 'monday' as WeekDays, label: 'ПН' },
                  { key: 'tuesday' as WeekDays, label: 'ВТ' },
                  { key: 'wednesday' as WeekDays, label: 'СР' },
                  { key: 'thursday' as WeekDays, label: 'ЧТ' },
                  { key: 'friday' as WeekDays, label: 'ПТ' },
                  { key: 'saturday' as WeekDays, label: 'СБ' },
                  { key: 'sunday' as WeekDays, label: 'ВС' },
                ].map((day) => (
                  <button
                    key={day.key}
                    onClick={() => toggleWeekday(day.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      scheduleFormData.selectedWeekdays.has(day.key)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            )}

            {/* Working Hours Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium">Рабочее время</h3>
                <button
                  onClick={() => setIsDayOff(!isDayOff)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isDayOff
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Выходной
                </button>
              </div>
              <div
                className={`flex items-center gap-4 ${isDayOff ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 mb-1">С</label>
                  <div className="relative">
                    <Select.Root
                      value={scheduleFormData.startTime}
                      onValueChange={(value) =>
                        setScheduleFormData((prev) => ({ ...prev, startTime: value }))
                      }
                      disabled={isDayOff}
                    >
                      <Select.Trigger className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2.5 text-sm bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Select.Value />
                        <Select.Icon>
                          <Clock className="w-4 h-4 text-blue-600" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                            <ChevronDown className="w-4 h-4 rotate-180" />
                          </Select.ScrollUpButton>
                          <Select.Viewport className="p-1 max-h-60">
                            {timeOptions.map((time) => (
                              <Select.Item
                                key={time}
                                value={time}
                                className="relative flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 outline-none cursor-pointer"
                              >
                                <Select.ItemText>{time}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                            <ChevronDown className="w-4 h-4" />
                          </Select.ScrollDownButton>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm text-gray-500 mb-1">До</label>
                  <div className="relative">
                    <Select.Root
                      value={scheduleFormData.endTime}
                      onValueChange={(value) =>
                        setScheduleFormData((prev) => ({ ...prev, endTime: value }))
                      }
                      disabled={isDayOff}
                    >
                      <Select.Trigger className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2.5 text-sm bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Select.Value />
                        <Select.Icon>
                          <Clock className="w-4 h-4 text-blue-600" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                            <ChevronDown className="w-4 h-4 rotate-180" />
                          </Select.ScrollUpButton>
                          <Select.Viewport className="p-1 max-h-60">
                            {timeOptions.map((time) => (
                              <Select.Item
                                key={time}
                                value={time}
                                className="relative flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 outline-none cursor-pointer"
                              >
                                <Select.ItemText>{time}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                            <ChevronDown className="w-4 h-4" />
                          </Select.ScrollDownButton>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>
              </div>
            </div>

            {/* Break Section */}
            <div className={`mb-6 ${isDayOff ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Перерыв</h3>
                <button
                  onClick={() => {
                    const newBreak = {
                      id: Date.now().toString(),
                      start: '12:00',
                      end: '13:00',
                    };
                    setBreaks([...breaks, newBreak]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isDayOff}
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {breaks.length > 0 && (
                <div className="mt-3 space-y-2">
                  {breaks.map((breakItem) => (
                    <div key={breakItem.id} className="flex items-center gap-2">
                      <Select.Root
                        value={breakItem.start}
                        onValueChange={(value) => {
                          setBreaks(
                            breaks.map((b) => (b.id === breakItem.id ? { ...b, start: value } : b)),
                          );
                        }}
                        disabled={isDayOff}
                      >
                        <Select.Trigger className="flex-1 inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm bg-white border border-gray-200 hover:bg-gray-50">
                          <Select.Value />
                          <Clock className="w-4 h-4 text-gray-400" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <Select.Viewport className="p-1 max-h-60">
                              {timeOptions.map((time) => (
                                <Select.Item
                                  key={time}
                                  value={time}
                                  className="relative flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 outline-none cursor-pointer"
                                >
                                  <Select.ItemText>{time}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>

                      <span className="text-gray-400">—</span>

                      <Select.Root
                        value={breakItem.end}
                        onValueChange={(value) => {
                          setBreaks(
                            breaks.map((b) => (b.id === breakItem.id ? { ...b, end: value } : b)),
                          );
                        }}
                        disabled={isDayOff}
                      >
                        <Select.Trigger className="flex-1 inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm bg-white border border-gray-200 hover:bg-gray-50">
                          <Select.Value />
                          <Clock className="w-4 h-4 text-gray-400" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <Select.Viewport className="p-1 max-h-60">
                              {timeOptions.map((time) => (
                                <Select.Item
                                  key={time}
                                  value={time}
                                  className="relative flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 outline-none cursor-pointer"
                                >
                                  <Select.ItemText>{time}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>

                      <button
                        onClick={() => setBreaks(breaks.filter((b) => b.id !== breakItem.id))}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        disabled={isDayOff}
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <button className="px-6 py-2.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Отмена
                </button>
              </Dialog.Close>
              <button
                onClick={handleSaveSchedule}
                disabled={isSavingSchedule}
                className="px-6 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingSchedule ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
