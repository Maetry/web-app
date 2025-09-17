import { ReactNode, createContext, useContext } from 'react';
import { cn } from '@/utils/cn';

interface SidebarContextValue {
  isOpen?: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({});

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar component');
  }
  return context;
};

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

type SidebarRootProps = SidebarProps;

const SidebarRoot = ({ children, className }: SidebarRootProps) => {
  return (
    <SidebarContext.Provider value={{}}>
      <aside
        className={cn('flex flex-col h-screen w-64 bg-neutral-200/90 backdrop-blur-sm', className)}
        role="navigation"
        aria-label="Main navigation"
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

const SidebarHeader = ({ children, className }: SidebarHeaderProps) => {
  return <header className={cn('p-4 border-b border-gray-300/50', className)}>{children}</header>;
};

interface SidebarContentProps {
  children: ReactNode;
  className?: string;
}

const SidebarContent = ({ children, className }: SidebarContentProps) => {
  return <div className={cn('flex-1 overflow-y-auto', className)}>{children}</div>;
};

interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

const SidebarFooter = ({ children, className }: SidebarFooterProps) => {
  return (
    <footer className={cn('mt-auto p-4 border-t border-gray-300/50', className)}>{children}</footer>
  );
};

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
});
