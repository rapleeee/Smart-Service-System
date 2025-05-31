'use client'
import React from 'react'
import { SidebarLayout } from './layout/SidebarLayout'
import { DashboardCard } from '@/components/ui/DashboardCard'

export default function page() {
  return (
    <SidebarLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Smart Service System</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard title="Total Permintaan" value="120" variant="blue" />
          <DashboardCard title="Menunggu Persetujuan" value="15" variant="yellow" />
          <DashboardCard title="Dalam Proses" value="8" variant="green" />
          <DashboardCard title="Selesai Bulan Ini" value="97" variant="red" />
        </div>
      </div>
    </SidebarLayout>
  )
}


