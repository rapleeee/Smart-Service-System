'use client'

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconCar, IconCalendarEvent, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'

export default function PengajuanPage() {
  const services = [
    {
      title: 'Pengajuan Kendaraan',
      description: 'Ajukan peminjaman kendaraan dinas untuk keperluan kantor',
      icon: <IconCar className="h-6 w-6" />,
      href: '/Pages/Pengajuan/kendaraan',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Jadwal Pertemuan',
      description: 'Atur jadwal meeting dan reservasi ruangan',
      icon: <IconCalendarEvent className="h-6 w-6" />,
      href: '/Pages/Pengajuan/pertemuan',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Request Jamuan',
      description: 'Ajukan permintaan jamuan untuk tamu atau acara',
      icon: <IconUsers className="h-6 w-6" />,
      href: '/Pages/Pengajuan/jamuan',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Pengajuan Layanan</h1>
            <p className="text-muted-foreground">Pilih jenis layanan yang Anda butuhkan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Button asChild className="w-full">
                  <Link href={service.href}>
                    Ajukan Sekarang
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}