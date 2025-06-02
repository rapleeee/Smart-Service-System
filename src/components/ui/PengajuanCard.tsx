"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface PengajuanCardProps {
  title: string;
  icon?: LucideIcon;
  variant?: 'default' | 'blue' | 'green' | 'yellow' | 'red';
  type: 'pertemuan' | 'jamuan' | 'akomodasi' | 'kendaraan';
}

export function PengajuanCard({ 
  title, 
  icon: Icon,
  variant = 'default',
  type
}: PengajuanCardProps) {
  const router = useRouter();
  
  const variantStyles = {
    default: "bg-white hover:bg-gray-50",
    blue: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30",
    green: "bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30",
    yellow: "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30",
    red: "bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
  };

  const handleClick = () => {
    router.push(`/Pages/Pengajuan/${type}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn("shadow-md p-4 rounded-xl transition-colors items-center justify-between cursor-pointer flex", variantStyles[variant])}>
      <p className="text-sm text-gray-500 font-medium dark:text-gray-400">{title}</p>
      {Icon && (
        <div className={cn("p-2 rounded-lg", variantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}