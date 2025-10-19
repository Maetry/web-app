type EmployeeProps = {
  name: string;
  avatar: string;
  children?: React.ReactNode;
};

export const Employee = ({ name, avatar, children }: EmployeeProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        {children && (
          <div className="absolute bottom-0 right-0 z-10">{children}</div>
        )}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};
