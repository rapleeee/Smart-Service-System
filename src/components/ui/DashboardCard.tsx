import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string;
  variant?: 'default' | 'blue' | 'green' | 'yellow' | 'red';
}

export function DashboardCard({ 
  title, 
  value, 
  variant = 'default' 
}: DashboardCardProps) {
  const variantStyles = {
    default: "bg-white",
    blue: "bg-blue-50 dark:bg-blue-900/20",
    green: "bg-green-50 dark:bg-green-900/20",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20",
    red: "bg-red-50 dark:bg-red-900/20"
  };

  return (
    <div className={cn(
      "shadow-md p-4 rounded-xl transition-colors", 
      variantStyles[variant]
    )}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  )
}