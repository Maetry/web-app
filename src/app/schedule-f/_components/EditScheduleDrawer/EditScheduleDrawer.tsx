'use client';

import { Drawer } from 'vaul';

export const EditScheduleDrawer = () => {
  return (
    <Drawer.Portal>
      <Drawer.Content className="absolute h-full right-0 top-0 z-50 flex w-[324px] flex-col bg-white shadow-xl">
        <div className="p-4 sticky">
          <h2 className="text-lg font-semibold">drawer here</h2>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};
