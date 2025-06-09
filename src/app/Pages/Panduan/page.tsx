'use client'

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconBook, IconCar, IconCalendarEvent, IconUsers } from '@tabler/icons-react'

const guideData = [
  {
    category: "Pengajuan Kendaraan",
    icon: <IconCar className="h-5 w-5" />,
    items: [
      {
        question: "Bagaimana cara mengajukan permintaan kendaraan?",
        answer: "1. Pilih menu 'Pengajuan' di sidebar\n2. Pilih 'Pengajuan Kendaraan'\n3. Isi form dengan lengkap\n4. Pastikan tanggal dan waktu penggunaan sudah benar\n5. Klik Submit untuk mengirim pengajuan"
      },
      {
        question: "Berapa lama proses persetujuan?",
        answer: "Proses persetujuan biasanya memakan waktu 1x24 jam kerja. Anda akan mendapat notifikasi setelah pengajuan disetujui."
      },
      {
        question: "Apa saja syarat pengajuan kendaraan?",
        answer: "- Pengajuan minimal H-3 sebelum penggunaan\n- Melampirkan surat tugas jika diperlukan\n- Mengisi detail tujuan dan keperluan dengan jelas"
      }
    ]
  },
  {
    category: "Pengajuan Pertemuan",
    icon: <IconCalendarEvent className="h-5 w-5" />,
    items: [
      {
        question: "Bagaimana cara memesan ruang meeting?",
        answer: "1. Akses menu 'Pengajuan' di sidebar\n2. Pilih 'Jadwal Pertemuan'\n3. Pilih ruangan yang tersedia\n4. Isi detail pertemuan\n5. Submit pengajuan"
      },
      {
        question: "Apa saja fasilitas ruang meeting?",
        answer: "- Proyektor dan layar\n- Whiteboard dan spidol\n- Air mineral\n- AC\n- Kapasitas sesuai dengan jenis ruangan"
      }
    ]
  },
  {
    category: "Pengajuan Jamuan",
    icon: <IconUsers className="h-5 w-5" />,
    items: [
      {
        question: "Bagaimana prosedur pengajuan jamuan?",
        answer: "1. Pilih menu 'Pengajuan'\n2. Pilih 'Request Jamuan'\n3. Isi detail jamuan dan jumlah peserta\n4. Pilih jenis jamuan yang diinginkan\n5. Submit pengajuan"
      },
      {
        question: "Kapan batas waktu pengajuan jamuan?",
        answer: "Pengajuan jamuan harus dilakukan minimal 3 hari kerja sebelum acara untuk memastikan ketersediaan dan kualitas layanan."
      }
    ]
  }
]

export default function PanduanPage() {
  return (
    <SidebarLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-primary/10">
            <IconBook className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Panduan Penggunaan</h1>
            <p className="text-muted-foreground">
              Pelajari cara menggunakan Smart Service System
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guideData.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <CardTitle>{category.category}</CardTitle>
                </div>
                <CardDescription>
                  Panduan lengkap {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.items.map((item, itemIdx) => (
                    <AccordionItem key={itemIdx} value={`item-${itemIdx}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="whitespace-pre-line text-sm text-muted-foreground">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Bantuan Tambahan</CardTitle>
            <CardDescription>
              Jika Anda memerlukan bantuan lebih lanjut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Untuk pertanyaan lebih lanjut, silakan hubungi:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Helpdesk: (021) 123-456</li>
                <li>Email: support@smartservice.kai.id</li>
                <li>Jam operasional: Senin - Jumat, 08.00 - 17.00 WIB</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}