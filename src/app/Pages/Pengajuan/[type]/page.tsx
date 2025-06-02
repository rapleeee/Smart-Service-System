'use client'
import { SidebarLayout } from '@/app/layout/SidebarLayout'
import FormAkomodasi from '@/components/forms/FormAkomodasi';
import FormJamuan from '@/components/forms/FormJamuan';
import FormKendaraan from '@/components/forms/FormKendaraan';
import FormPertemuan from '@/components/forms/FormPertemuan';
import { useParams } from 'next/navigation'

export default function PengajuanPage() {
  const { type } = useParams();
  
  const renderForm = () => {
    switch(type) {
      case 'Pertemuan': return <FormPertemuan />
      case 'Jamuan': return <FormJamuan />
      case 'Akomodasi': return <FormAkomodasi />
      case 'Kendaraan': return <FormKendaraan />
      default: return <div>Invalid type</div>
    }
  }

  return (
    <SidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Form Pengajuan {type}</h1>
        {renderForm()}
      </div>
    </SidebarLayout>
  )
}