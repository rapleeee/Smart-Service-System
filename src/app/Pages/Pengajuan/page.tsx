'use client'

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { useParams } from 'next/navigation'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

interface FormData {
  title: string;
  date: Date | undefined;
  time: string;
  location: string;
  participants: number;
  description: string;
}

export default function PengajuanPage() {
  const params = useParams();
  const type = params.type as string;
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: undefined,
    time: '',
    location: '',
    participants: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage with type prefix
    const key = `pengajuan_${type}_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(formData));
    alert('Pengajuan berhasil disimpan!');
  };

  const getFormTitle = () => {
    switch(type) {
      case 'pertemuan': return 'Pengajuan Fasilitas Pertemuan';
      case 'jamuan': return 'Pengajuan Jamuan Rapat';
      case 'akomodasi': return 'Pengajuan Akomodasi';
      case 'kendaraan': return 'Pengajuan Kendaraan Dinas';
      default: return 'Pengajuan';
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{getFormTitle()}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Judul Kegiatan</Label>
                <Input 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={date => setFormData({...formData, date})}
                  className="rounded-md border"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Waktu</Label>
                <Input 
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>Lokasi</Label>
                <Input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>Jumlah Peserta</Label>
                <Input 
                  type="number"
                  value={formData.participants}
                  onChange={e => setFormData({...formData, participants: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Deskripsi Kegiatan</Label>
            <Textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Pengajuan
          </Button>
        </form>
      </div>
    </SidebarLayout>
  )
}