import { cn } from '@/utils/cn';
import { Drawer } from 'vaul';

type ScheduleCellDisplayProps = {
  schedule:
    | { status: 'day-off' }
    | { status: 'working'; workingHours: [string, string]; lunchBreak?: boolean }
    | { status: 'unplanned' };
  isInPast?: boolean;
  isEditing?: boolean;
};

const formatTime = (timeString: string): string => {
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(timeString));
};

export const ScheduleCellDisplay = ({
  isEditing,
  isInPast,
  schedule,
}: ScheduleCellDisplayProps) => {
  if (isEditing && isInPast) {
    throw new Error('Invalid state: past dates cannot be edited');
  }

  return (
    <Drawer.Trigger asChild>
      <div
        className={cn(
          'flex rounded border w-16 h-18 transition-colors cursor-pointer items-center justify-center text-center',
          schedule.status === 'day-off' && 'bg-gray-100 text-gray-500 border-gray-200',
          schedule.status === 'working' && 'bg-white border-gray-300 text-gray-900',
          schedule.status === 'unplanned' &&
            'bg-gray-50 border-dashed border-gray-300 text-gray-400',
          isInPast && 'opacity-60',
          isEditing && 'ring-2 ring-blue-500 border-blue-500',
        )}
      >
        {schedule.status === 'day-off' && 'Day off'}
        {schedule.status === 'working' && (
          <span className="text-xs/none">
            {formatTime(schedule.workingHours[0])}
            <br />
            {schedule.lunchBreak ? <span className="text-[#FF8263]">✦</span> : '–'}
            <br />
            {formatTime(schedule.workingHours[1])}
          </span>
        )}
        {schedule.status === 'unplanned' && <span className="italic">Not planned</span>}
      </div>
    </Drawer.Trigger>
  );
};
