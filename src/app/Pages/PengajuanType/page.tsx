"use client"
import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { PengajuanCard } from '@/components/ui/PengajuanCard'
import { BedSingle, BusFront, Coffee, Home } from 'lucide-react'
import React from 'react'

export default function PengajuanTypePage() {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Pengajuan Jenis Layanan</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Pilih jenis layanan yang ingin diajukan. Setiap jenis layanan memiliki prosedur dan persyaratan yang berbeda.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PengajuanCard 
          title="Fasilitas Pertemuan" 
          icon={Home} 
          variant="blue" 
          type="pertemuan" 
        />
        <PengajuanCard 
          title="Jamuan Rapat" 
          icon={Coffee} 
          variant="green" 
          type="jamuan" 
        />
        <PengajuanCard 
          title="Akomodasi" 
          icon={BedSingle} 
          variant="yellow" 
          type="akomodasi" 
        />
        <PengajuanCard 
          title="Kendaraan Dinas" 
          icon={BusFront} 
          variant="red" 
          type="kendaraan" 
        />
      </div>
    </SidebarLayout>
  )
}