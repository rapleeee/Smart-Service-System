'use client'
import React from 'react'
import { SidebarLayout } from './layout/SidebarLayout'
import { DashboardCard } from '@/components/ui/DashboardCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconCar, IconCalendarEvent, IconUsers, IconReceipt } from '@tabler/icons-react'
import Link from 'next/link'

const recentActivities = [
  { id: 1, type: 'Kendaraan', user: 'John Doe', status: 'Pending', date: '2025-06-03', dept: 'IT' },
  { id: 2, type: 'Pertemuan', user: 'Jane Smith', status: 'Approved', date: '2025-06-02', dept: 'HR' },
  { id: 3, type: 'Jamuan', user: 'Mike Wilson', status: 'In Progress', date: '2025-06-01', dept: 'Marketing' },
]

export default function Dashboard() {
  return (
    <SidebarLayout>
        <div className="p-6 space-y-6">
        <div className="flex-col md:flex sm:flex-row  justify-between items-center">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Dashboard Smart Service System</h1>
            <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Button variant="outline" asChild>
              <Link href="/Pages/Laporan">Lihat Laporan</Link>
            </Button>
          </div>
        </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard 
            title="Total Permintaan" 
            value="120" 
            variant="blue" 
            change="+12% dari bulan lalu"
          />
          <DashboardCard 
            title="Menunggu Persetujuan" 
            value="15" 
            variant="yellow"
            change="5 permintaan baru"
          />
          <DashboardCard 
            title="Dalam Proses" 
            value="8" 
            variant="green"
            change="3 selesai hari ini"
          />
          <DashboardCard 
            title="Selesai Bulan Ini" 
            value="97" 
            variant="red"
            change="Target: 100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className='h-full '>    
            <CardHeader>
              <CardTitle>Layanan Populer </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/Pages/Pengajuan/kendaraan">
                    <IconCar className="mr-2 h-4 w-4" />
                    Pengajuan Kendaraan
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/Pages/Pengajuan/pertemuan">
                    <IconCalendarEvent className="mr-2 h-4 w-4" />
                    Jadwal Pertemuan
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/Pages/Pengajuan/jamuan">
                    <IconUsers className="mr-2 h-4 w-4" />
                    Request Jamuan
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 h-full">
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user} • {activity.dept}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        activity.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <IconReceipt className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <div>
                  <h3 className="font-medium">Panduan Penggunaan</h3>
                  <p className="text-sm text-muted-foreground">
                    Lihat cara menggunakan sistem layanan dan tips pengajuan yang efektif
                  </p>
                </div>
                <Link className="text-sm mt-2 hover:underline" href="/Pages/Panduan">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}