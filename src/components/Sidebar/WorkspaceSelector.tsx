'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useGetWorkspaceQuery } from '@/services/maestri/enhanced-api';
import { useCurrentWorkspace } from '@/features/workspace/hooks/useCurrentWorkspace';
import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

export const WorkspaceSelector = () => {
  const { data: workspaces, isLoading } = useGetWorkspaceQuery();
  const { currentWorkspaceId, setCurrentWorkspaceId } = useCurrentWorkspace();

  if (isLoading || !workspaces || workspaces.length === 0) {
    return <div className="h-10 bg-white/50 rounded-md animate-pulse" />;
  }

  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId);

  return (
    <Select.Root
      value={currentWorkspaceId || undefined}
      onValueChange={(value) => setCurrentWorkspaceId({ currentWorkspaceId: value })}
    >
      <Select.Trigger
        className="inline-flex items-center justify-between w-full rounded-md px-3 py-2 text-sm bg-white/60 hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Select workspace"
      >
        <Select.Value placeholder="Select a workspace">
          {currentWorkspace && (
            <span className="flex items-center gap-2">
              {currentWorkspace.logo && (
                <Image
                  src={currentWorkspace.logo}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-sm object-cover"
                />
              )}
              <span className="truncate">{currentWorkspace.name}</span>
            </span>
          )}
        </Select.Value>
        <Select.Icon className="ml-2">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200"
          position="popper"
          sideOffset={5}
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
            <ChevronDownIcon className="rotate-180" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {workspaces.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                <span className="flex items-center gap-2">
                  {workspace.logo && (
                    <Image
                      src={workspace.logo}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-sm object-cover"
                    />
                  )}
                  <span className="truncate">{workspace.name}</span>
                </span>
              </SelectItem>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = forwardRef<
  HTMLDivElement,
  Select.SelectItemProps & { children: React.ReactNode }
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cn(
        'relative flex items-center px-8 py-2 text-sm rounded-sm select-none hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer',
        'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        className,
      )}
      ref={forwardedRef}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem';
