'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { ComponentType, SVGProps } from 'react';

export interface NavItem {
  label: string;
  url: string;
  hotkey?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface SidebarNavProps {
  items: NavItem[];
}

export const SidebarNav = ({ items }: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav className="px-2 py-4" aria-label="Main navigation">
      <ul className="space-y-1" role="list">
        {items.map((item) => (
          <NavLink key={item.url} item={item} isActive={pathname === item.url} />
        ))}
      </ul>
    </nav>
  );
};

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

const NavLink = ({ item, isActive }: NavLinkProps) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.url}
        className={cn(
          'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
          'hover:bg-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
          isActive ? 'bg-gray-300/60 text-gray-900' : 'text-gray-700 hover:text-gray-900',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon
          className={cn(
            'flex-shrink-0 mr-3 h-5 w-5 transition-colors',
            isActive ? 'text-blue-600' : 'text-blue-500 group-hover:text-blue-600',
          )}
          aria-hidden="true"
        />
        <span className="flex-1">{item.label}</span>
        {item.hotkey && (
          <span
            className="ml-auto text-xs text-gray-500"
            aria-label={`Keyboard shortcut: ${item.hotkey}`}
          >
            {item.hotkey}
          </span>
        )}
      </Link>
    </li>
  );
};
