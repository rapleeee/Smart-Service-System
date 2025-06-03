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
    tanggal: "2025-06-01",
    nama: "John Doe",
    departemen: "IT",
    jenisPengajuan: "Kendaraan",
    status: "Disetujui",
    keterangan: "Perjalanan dinas ke Jakarta"
  },
  {
    id: 2,
    tanggal: "2025-06-02",
    nama: "Jane Smith",
    departemen: "HR",
    jenisPengajuan: "Pertemuan",
    status: "Pending",
    keterangan: "Meeting dengan client"
  },
  // Add more dummy data here
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
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Jenis Pengajuan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pengajuanData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.departemen}</TableCell>
                  <TableCell>{item.jenisPengajuan}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Disetujui" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.keterangan}</TableCell>
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