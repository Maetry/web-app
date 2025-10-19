'use client';

import IconRecords from '~/public/icons/icon-records.svg';
import IconServices from '~/public/icons/icon-services.svg';
import IconMasters from '~/public/icons/icon-masters.svg';
import IconClients from '~/public/icons/icon-clients.svg';
import IconSchedule from '~/public/icons/icon-schedule.svg';
import IconFinance from '~/public/icons/icon-finance.svg';
import IconStatistics from '~/public/icons/icon-statistics.svg';
import { Path } from '@/router/paths';
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
  type NavItem,
} from '@/components/Sidebar';
import { useGetWorkspaceByIdQuery, useGetWorkspaceQuery } from '@/services/maestri/enhanced-api';
import { useCurrentWorkspace } from '@/features/workspace/hooks/useCurrentWorkspace';
import { useGetUsersQuery } from '@/services/maestri/api-generated';

const menuItems: NavItem[] = [
  {
    label: 'Записи',
    url: '/records',
    hotkey: '⌘⇧A',
    icon: IconRecords,
  },
  {
    label: 'Услуги',
    url: '/services',
    hotkey: '⇧A',
    icon: IconServices,
  },
  {
    label: 'Мастера',
    url: '/masters',
    hotkey: '⌘B',
    icon: IconMasters,
  },
  {
    label: 'Клиенты',
    url: '/clients',
    hotkey: '⇧C',
    icon: IconClients,
  },
  {
    label: 'Расписание',
    url: Path.Schedule,
    hotkey: '⌘⇧A',
    icon: IconSchedule,
  },
  {
    label: 'Финансы',
    url: '/finance',
    hotkey: '⌘D',
    icon: IconFinance,
  },
  {
    label: 'Статистика',
    url: '/schedule-new',
    hotkey: '⌘X',
    icon: IconStatistics,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useGetWorkspaceQuery();
  const { currentWorkspaceId } = useCurrentWorkspace();

  // Fetch full workspace to get employee token
  // This will automatically store the employee token via the enhanced API
  useGetWorkspaceByIdQuery(
    { id: currentWorkspaceId! },
    {
      skip: !currentWorkspaceId,
    },
  );

  // Fetch current user information
  const { data: userInfo } = useGetUsersQuery();

  // Prepare user data for SidebarFooter
  const userData = userInfo
    ? {
        name: userInfo.nickname,
        avatar: userInfo.avatar,
        subtitle: 'Учётная запись Maestri',
      }
    : undefined;

  return (
    <div className="flex h-screen w-full bg-neutral-200/90 backdrop-blur-2xl">
      <Sidebar>
        <Sidebar.Header>
          <SidebarHeader />
        </Sidebar.Header>

        <Sidebar.Content>
          <SidebarNav items={menuItems} />
        </Sidebar.Content>

        {/*<Sidebar.Footer>/!*<SidebarFooter user={null} />*!/</Sidebar.Footer>*/}
      </Sidebar>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
