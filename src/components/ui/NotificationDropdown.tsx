import React from 'react';
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'review' | 'returned';
}

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  isOpen: boolean;
}

export function NotificationDropdown({ notifications, isOpen }: NotificationDropdownProps) {
  const getStatusColor = (status: NotificationItem['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'approved':
        return 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'review':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'returned':
        return 'bg-neutral-50 text-neutral-800 dark:bg-neutral-900/20 dark:text-neutral-300';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
      <div className="p-4">
        <h3 className="text-sm font-medium">Notifications</h3>
        <div className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-700">
          {notifications.map((notification) => (
            <div key={notification.id} className="py-3">
              <div className="flex items-start space-x-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{notification.message}</p>
                  <span className="mt-1 inline-block rounded-full py-0.5 text-xs font-medium leading-4 tracking-wide">
                    {notification.timestamp}
                  </span>
                </div>
                <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", getStatusColor(notification.status))}>
                  {notification.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}