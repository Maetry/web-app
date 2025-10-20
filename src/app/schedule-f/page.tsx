'use client';

import { useState } from 'react';
import { useDatePeriods } from '@/hooks/useDatePeriods';
import { EmployeeScheduleGrid } from '@/app/schedule-f/_components/EmployeeScheduleGrid/EmployeeScheduleGrid';
import { Button } from '@/components/Button/Button';
import { useGetWorkspaceEmployeesQuery } from '@/services/maestri/enhanced-api';
import { Drawer } from 'vaul';
import { EditScheduleDrawer } from '@/app/schedule-f/_components/EditScheduleDrawer';

export default function SchedulePage() {
  const { datePeriods, loadNextPeriod } = useDatePeriods();
  const { data: employees } = useGetWorkspaceEmployeesQuery();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  if (!employees) return null;

  return (
    <Drawer.Root direction="right" modal={false} container={container}>
      <div ref={setContainer} className="p-4 relative">
        <div className="space-y-4">
          {employees.map((employee) => (
            <EmployeeScheduleGrid key={employee.id} employee={employee} datePeriods={datePeriods} />
          ))}
        </div>
      </div>
      <EditScheduleDrawer />
    </Drawer.Root>
  );
}
