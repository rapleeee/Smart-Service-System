"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconFileUpload,
    IconLayoutDashboardFilled,
    IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/others/Logo";
import { Bell, ChartColumnBigIcon, ClipboardCopy } from "lucide-react";
import { format } from "date-fns";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";
import { notifications } from "@/utils/NotificationsDummy";
import { Toaster } from "sonner";
import Image from "next/image";


interface SidebarLayoutProps {
    children: React.ReactNode;
}


export function SidebarLayout({ children }: SidebarLayoutProps) {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconLayoutDashboardFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Pengajuan",
            href: "/Pages/PengajuanType",
            icon: (
                <IconFileUpload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Status Pengajuan",
            href: "/Pages/Status",
            icon: (
                <IconFileUpload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "USC Dashboard",
            href: "/Pages/UscDashboard",
            icon: (
                <ClipboardCopy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Laporan Pengajuan",
            href: "/Pages/Laporan",
            icon: (
                <ChartColumnBigIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "/auth/Login",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);
    const [hasNotification] = useState(true);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);



    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-hidden border border-neutral-200 bg-neutral-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "min-h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={false}>
                <SidebarBody className="justify-between gap-10 ">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <>
                            <Logo />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Super Admin",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://avatar.iran.liara.run/public/17"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 flex-col">
                <div className="flex h-16 items-center justify-between gap-4 px-4 dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="text-sm text-neutral-600 dark:text-neutral-300">
                        {currentTime ? (
                            <>
                                <span className="hidden md:inline">
                                    {format(currentTime, 'EEEE, dd MMMM yyyy')} |{' '}
                                </span>
                                {format(currentTime, 'HH:mm:ss')}
                            </>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Bell
                                className="h-6 w-6 text-neutral-600 hover:text-neutral-800 cursor-pointer dark:text-neutral-300 dark:hover:text-neutral-100"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            />
                            {hasNotification && (
                                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></div>
                                </div>
                            )}
                            <NotificationDropdown
                                notifications={notifications}
                                isOpen={isNotificationOpen}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1">
                    <div className="flex min-h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                        {children}
                    </div>
                </div>
            </div>
            <Toaster />

        </div>
    );
}



