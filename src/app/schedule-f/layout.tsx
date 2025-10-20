import Image from 'next/image';
import React from 'react';
import type { NavItem } from '@/components/Sidebar';
import IconRecords from '~/public/icons/icon-records.svg';
import { Path } from '@/router/paths';
import IconSchedule from '~/public/icons/icon-schedule.svg';

const menuItems: NavItem[] = [
  {
    label: 'Записи',
    url: '/records',
    hotkey: '⌘⇧A',
    icon: IconRecords,
  },
  {
    label: 'Расписание',
    url: Path.Schedule,
    hotkey: '⌘⇧A',
    icon: IconSchedule,
  },
];

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <aside className="w-64 bg-[#E0E0DF]/85 backdrop-blur-[100px]">{/* Sidebar content */}</aside>
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-[#EAEAEA]/80 backdrop-blur-[30px]">
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
        </header>

        {/* Second row - fills remaining space */}
        <main className="relative flex-1 overflow-auto overflow-x-hidden bg-white">{children}</main>
      </div>
    </div>
  );
}
