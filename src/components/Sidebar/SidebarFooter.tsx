'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import IconNotifications from '~/public/icons/icon-notifications.svg';
import { cn } from '@/utils/cn';
import { authStorage } from '@/features/auth/auth.storage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface UserInfo {
  name: string;
  avatar?: string;
  subtitle?: string;
}

interface SidebarFooterProps {
  user?: UserInfo;
  onNotificationsClick?: () => void;
}

export const SidebarFooter = ({
  user,
  onNotificationsClick,
}: SidebarFooterProps) => {
  const router = useRouter();

  const handleLogout = () => {
    authStorage.clearTokens();
    router.push('/auth');
  };

  const displayUser = user || { 
    name: 'Loading...', 
    subtitle: 'Учётная запись Maetry' 
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onNotificationsClick}
        className={cn(
          'flex items-center gap-3 px-3 py-2 w-full text-sm font-medium rounded-md transition-colors',
          'hover:bg-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
        )}
        aria-label="View notifications"
      >
        <IconNotifications className="h-5 w-5 text-blue-500" aria-hidden="true" />
        <span>Уведомления</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-100 rounded-md transition-colors">
            <Image
              src={displayUser.avatar || '/images/avatar-stub.png'}
              alt={`${displayUser.name} avatar`}
              width={40}
              height={40}
              className="rounded-full flex-shrink-0"
            />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 truncate">{displayUser.name}</p>
              {displayUser.subtitle && <p className="text-xs text-gray-600 truncate">{displayUser.subtitle}</p>}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
