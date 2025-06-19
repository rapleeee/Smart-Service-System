"use client"

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

// Dummy data untuk laporan pengajuan
const pengajuanData = [
  {
    id: 1,
    tanggalPengajuan: "2025-05-19",
    nama: "Ilham",
    unit: "KGB",
    jenisPengajuan: "Jamuan Kegiatan",
    tanggalMulai: "2025-05-23",
    tanggalSelesai: "2025-05-23",
    status: "Disetujui",
    keteranganKegiatan: "Rapat LPJ KA PSO TA 2024",
  },
  {
    id: 2,
    tanggalPengajuan: "2025-05-20",
    nama: "Bima",
    unit: "KGP",
    jenisPengajuan: "Jamuan Kegiatan",
    tanggalMulai: "2025-05-24",
    tanggalSelesai: "2025-05-24",
    status: "Disetujui",
    keteranganKegiatan: "Rapat Realisasi RAB KA Perintis TA 2024",
  },
  {
    id: 3,
    tanggalPengajuan: "2025-05-21",
    nama: "Rizkar",
    unit: "CCC",
    jenisPengajuan: "Kendaraan Dinas",
    tanggalMulai: "2025-05-25",
    tanggalSelesai: "2025-05-28",
    status: "Disetujui",
    keteranganKegiatan: "Rekonsiliasi Biaya Inject",
  },
  {
    id: 4,
    tanggalPengajuan: "2025-05-25",
    nama: "Bagus",
    unit: "KCA",
    jenisPengajuan: "Penginapan",
    tanggalMulai: "2025-06-01",
    tanggalSelesai: "2025-06-05",
    status: "Disetujui",
    keteranganKegiatan: "Program Rencana Kerja Anggaran",
  },
  {
    id: 5,
    tanggalPengajuan: "2025-05-28",
    nama: "Dini",
    unit: "CPM",
    jenisPengajuan: "Meeting Room",
    tanggalMulai: "2025-05-29",
    tanggalSelesai: "2025-05-29",
    status: "Disetujui",
    keteranganKegiatan: "Penerapan Dynamic Pricing",
  }
]

export default function LaporanPage() {
  const handleDownload = () => {
    toast.success("File Excel berhasil didownload!")
  }

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Laporan Pengajuan</h1>
          <Button onClick={handleDownload}>
            Download Excel
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Tanggal Pengajuan</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Jenis Pengajuan</TableHead>
                <TableHead>Tanggal Mulai</TableHead>
                <TableHead>Tanggal Selesai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Keterangan Kegiatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pengajuanData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.tanggalPengajuan}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.jenisPengajuan}</TableCell>
                  <TableCell>{item.tanggalMulai}</TableCell>
                  <TableCell>{item.tanggalSelesai}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Disetujui" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.keteranganKegiatan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Pengajuan</h3>
            <p className="text-3xl font-bold">{pengajuanData.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Disetujui</h3>
            <p className="text-3xl font-bold text-green-600">
              {pengajuanData.filter(item => item.status === "Disetujui").length}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {pengajuanData.filter(item => item.status === "Pending").length}
            </p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}