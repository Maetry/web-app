'use client';

import React from 'react';
import Image from 'next/image';
import { useCurrentWorkspace } from '@/features/workspace/hooks/useCurrentWorkspace';
import {
  useGetTimetablesSchedulesQuery,
  useGetWorkspaceByIdQuery,
  useGetWorkspaceEmployeesQuery,
} from '@/services/maestri/enhanced-api';
import * as Popover from '@radix-ui/react-popover';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useMemo, useState } from 'react';
import { SafeDateInterval } from '@/services/maestri/api-generated';
import { format, isPast } from 'date-fns';
import { cn } from '@/utils/cn';
import { Button } from '@/components/Button';

const lang = 'ru';

const getLongMonths = (locale = lang) => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2025, i, 1)));
};

export default function Schedule() {
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const monthDays = Array.from(
    Array(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()),
    (_, i) => i + 1,
  );

  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data: currentWorkspace } = useGetWorkspaceByIdQuery(
    { id: currentWorkspaceId as string },
    { skip: !currentWorkspaceId },
  );
  const { data: workspaceEmployees = [] } = useGetWorkspaceEmployeesQuery(undefined, {
    skip: !currentWorkspace,
  });

  const getTimetablesSchedulesQuery = useGetTimetablesSchedulesQuery(
    {
      owners: [
        `salon:${currentWorkspaceId}`,
        ...workspaceEmployees.map((employee) => `employee:${employee.id}`),
      ],
      period: {
        start: `${date.getFullYear()}-${format(date, 'LL')}-01T00:00:00.000Z`,
        end: `${date.getFullYear()}-${format(date, 'LL')}-${monthDays.length}T00:00:00.000Z`,
      },
    },
    { skip: !currentWorkspaceId },
  );

  const fullMonthTimetableSchedules = useMemo(
    () =>
      getTimetablesSchedulesQuery.data?.map((timetable) => {
        return {
          ...timetable,
          intervals: timetable.intervals.reduce((acc, el) => {
            acc[new Date(el.start).getDate() - 1] = el;
            return acc;
          }, [] as SafeDateInterval[]),
        };
      }),
    [getTimetablesSchedulesQuery.data],
  );

  const monthYear = new Intl.DateTimeFormat(lang, {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return (
    <main className="rounded-tl-xl rounded-bl-xl overflow-hidden">
      <section className="flex flex-col h-svh">
        <div className="flex justify-between backdrop-blur-2xl shrink-0 bg-[#eaeaea]/80 py-3 px-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/schedule.svg"
              className="text-black/50"
              width={20}
              height={20}
              alt=""
            />
            <h1 className="text-base">Расписание</h1>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <button>
                <Image
                  src="/icons/icon-clients.svg"
                  className="text-black/50"
                  width={20}
                  height={20}
                  alt=""
                />
              </button>
            </div>
            <Popover.Root open={isMonthPickerOpen} onOpenChange={setIsMonthPickerOpen}>
              <Popover.Trigger asChild>
                <div className="border cursor-pointer border-black/5 p-1.5 rounded-md text-sm text-[#2a2a34] flex items-center gap-2">
                  {monthYear}
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="rounded-md bg-[#F6F6F6] focus:outline-none drop-shadow-2xl px-2 pb-2.5 pt-4 min-w-3xs"
                  sideOffset={12}
                  align="end"
                >
                  <div className="px-2 text-base flex justify-between leading-none font-bold text-black">
                    Выбор месяца
                    <div className="text-[#428BF9] font-medium">{date.getFullYear()}</div>
                  </div>
                  <div>
                    <ul className="flex gap-1 flex-col text-sm text-black font-medium mt-3">
                      {getLongMonths().map((month, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setDate((date) => {
                              const nextDate = new Date(date);
                              nextDate.setMonth(i);
                              return nextDate;
                            });
                            setIsMonthPickerOpen(false);
                          }}
                          className="cursor-pointer px-2 py-1 rounded hover:bg-[#6F97FF] hover:text-white transition"
                        >
                          {month}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
        <div className="relative h-full grow bg-white min-h-0 overflow-auto py-9 px-6">
          <div
            className="grid gap-x-1.5 gap-y-5 grid-flow-row"
            style={{ gridTemplateColumns: `repeat(${monthDays.length + 1}, 3.5rem)` }}
          >
            {currentWorkspace && (
              <div className="flex flex-col sticky left-0 bg-white gap-1 text-center w-full">
                <Image
                  src={currentWorkspace.logo}
                  width={56}
                  height={56}
                  className="rounded-xl"
                  objectFit="cover"
                  alt=""
                />
                <span className="text-xs leading-3 font-medium text-[#2a2a34]">График салона</span>
              </div>
            )}
            {monthDays.map((day, i) => (
              <div key={i} className="h-20 flex flex-col text-center shadow-md rounded-sm">
                <span className="text-base text-[#A5A5BB] border-b border-[#A5A5BB] py-2 leading-none">
                  <span className="text-[#2a2a34]">{day}</span>{' '}
                  {new Intl.DateTimeFormat(lang, { weekday: 'short' })
                    .format(date.setDate(day))
                    .toLowerCase()}
                </span>
                <span className="text-xs flex items-center justify-center h-full text-[#2a2a34] leading-none">
                  {fullMonthTimetableSchedules && !fullMonthTimetableSchedules[0].intervals[i] && (
                    <span className="text-[#DB2D37]">Вых.</span>
                  )}

                  {fullMonthTimetableSchedules && fullMonthTimetableSchedules[0].intervals[i] && (
                    <>
                      {new Date(
                        fullMonthTimetableSchedules[0].intervals[i].start,
                      ).toLocaleTimeString(lang, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      <br /> - <br />
                      {new Date(fullMonthTimetableSchedules[0].intervals[i].end).toLocaleTimeString(
                        lang,
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                    </>
                  )}
                </span>
              </div>
            ))}
            {workspaceEmployees.map((employee, i) => (
              <React.Fragment key={employee.id}>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <div className="flex sticky bg-white z-10 left-0 flex-col items-center gap-0.5 cursor-pointer">
                      <Image
                        src={employee.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-full size-12 hover:scale-80 transition"
                        priority
                      />
                      <span className="text-xs text-[#2A2A34]">${employee.nickname}</span>
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="rounded-md bg-[#F6F6F6] drop-shadow-2xl p-1 font-medium text-sm text-black flex flex-col gap-1"
                      sideOffset={5}
                      side="right"
                      align="start"
                    >
                      <DropdownMenu.Item className="rounded hover:text-white px-2.5 hover:bg-[#0A82FF] cursor-pointer transition">
                        Скрыть мастера
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="rounded hover:text-white px-2.5 hover:bg-[#0A82FF] cursor-pointer transition">
                        Шаблон графика
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
                {monthDays.map((monthDay, ii) => (
                  <div
                    key={`${employee.id}-${monthDay}`}
                    className={cn(
                      'flex items-center rounded justify-center text-center font-medium bg-[#F2F7FC] empty:bg-[#F9F9F9] text-[#2A2A34] text-xs leading-none',
                      {
                        'opacity-50':
                          fullMonthTimetableSchedules &&
                          fullMonthTimetableSchedules[i + 1] &&
                          isPast(fullMonthTimetableSchedules[i + 1].intervals[ii]?.start),
                        'border border-[#DB2D37]':
                          fullMonthTimetableSchedules &&
                          fullMonthTimetableSchedules[i + 1] &&
                          !fullMonthTimetableSchedules[i + 1].intervals[ii] &&
                          !fullMonthTimetableSchedules[0].intervals[ii],
                      },
                    )}
                  >
                    {fullMonthTimetableSchedules &&
                      fullMonthTimetableSchedules[i + 1] &&
                      fullMonthTimetableSchedules[i + 1].intervals[ii] && (
                        <>
                          {new Date(
                            fullMonthTimetableSchedules[i + 1].intervals[ii].start,
                          ).toLocaleTimeString(lang, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          <br /> - <br />
                          {new Date(
                            fullMonthTimetableSchedules[0].intervals[ii].end,
                          ).toLocaleTimeString(lang, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </>
                      )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="w-xs bg-white drop-shadow-2xl h-full p-5 border-black/10 border-l absolute top-0 right-0 transition-all">
            <h2 className="text-2xl font-semibold">Настройка дня</h2>
            <div className="mt-5 rounded p-2 drop-shadow-2xl flex flex-col">
              <span>Мастер маникюра</span>
              <div className="flex flex-col gap-4 mt-5">
                <div className="text-base font-medium">Рабочее время</div>
                <div className="flex max-w-full gap-3">
                  <input
                    placeholder="С"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                  <input
                    placeholder="До"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <div className="text-base font-medium">Перерыв</div>
                <div className="flex max-w-full gap-3">
                  <input
                    placeholder="С"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                  <input
                    placeholder="До"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <div className="text-base font-medium">Начало графика</div>
                <div className="flex max-w-full gap-3">
                  <input
                    placeholder="С"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                  <input
                    placeholder="До"
                    className="rounded-sm max-w-24 basis-1/2 flex py-1 px-1.5 drop-shadow-2xl"
                    style={{
                      boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="secondary"
                  className="py-0.5 px-2 text-sm leading-none"
                  style={{
                    boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                  }}
                >
                  Отмена
                </Button>
                <Button
                  className="py-1 text-white px-2 text-sm leading-none bg-[#6F97FF]"
                  style={{
                    boxShadow: '0px 0px 0px 0.5px #0000000D, 0px 0.5px 2.5px 0px #0000004D',
                  }}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
