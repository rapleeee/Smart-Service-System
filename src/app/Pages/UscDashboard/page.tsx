'use client'

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Define service type
type ServiceType = 'Kendaraan' | 'Pertemuan' | 'Jamuan';

interface Pengajuan {
  id: string;
  type: ServiceType;
  requester: string;
  department: string;
  date: string;
  status: string;
  vendor: string;
  vendorEmail: string;
}

// Dummy data - replace with actual data fetching
const pengajuanData: Pengajuan[] = [
  {
    id: "REQ-2025-001",
    type: "Kendaraan",
    requester: "Budi Santoso",
    department: "Direktorat Operasi",
    date: "2025-06-10",
    status: "Pending",
    vendor: "",
    vendorEmail: ""
  },
  {
    id: "REQ-2025-002",
    type: "Pertemuan",
    requester: "Dewi Kusuma",
    department: "Direktorat SDM",
    date: "2025-06-11",
    status: "Pending",
    vendor: "",
    vendorEmail: ""
  },
  {
    id: "REQ-2025-003",
    type: "Jamuan",
    requester: "Ahmad Hidayat",
    department: "Direktorat Keuangan",
    date: "2025-06-12",
    status: "Pending",
    vendor: "",
    vendorEmail: ""
  }
]

// Vendor data by service type
const vendorList: Record<ServiceType, { id: number; name: string; email: string }[]> = {
  Kendaraan: [
    { id: 1, name: "PT Trans Jaya", email: "dispatch@transjaya.com" },
    { id: 2, name: "Sewa Mobil Nusantara", email: "order@sewamobilnusantara.com" },
    { id: 3, name: "Armada Prima", email: "booking@armadaprima.co.id" }
  ],
  Pertemuan: [
    { id: 1, name: "Hotel Bidakara", email: "events@bidakara.com" },
    { id: 2, name: "Menara Peninsula", email: "booking@peninsula.co.id" },
    { id: 3, name: "Gedung Serbaguna KAI", email: "gsg@kai.id" }
  ],
  Jamuan: [
    { id: 1, name: "Catering Sari Rasa", email: "order@sarirasa.com" },
    { id: 2, name: "Prima Catering", email: "prima@cateringjakarta.com" },
    { id: 3, name: "Dapur Nusantara", email: "catering@dapurnusantara.co.id" }
  ]
}

export default function UscDashboard() {
 const [requests, setRequests] = useState(pengajuanData)

  const handleVendorSelect = (requestId: string, vendorName: string) => {
    const selectedVendor = Object.values(vendorList)
      .flat()
      .find(v => v.name === vendorName)

    if (!selectedVendor) return;
    setRequests(requests.map(r => 
      r.id === requestId ? { 
        ...r, 
        vendor: selectedVendor.name,
        vendorEmail: selectedVendor.email 
      } : r
    ))
  }

    const handleSendToVendor = async (id: string) => {
    // In production, integrate with your email service (e.g., SendGrid, AWS SES)
    const request = requests.find(r => r.id === id)
    
    try {
      // Simulated email sending
      toast.promise(
        new Promise(resolve => setTimeout(resolve, 1500)),
        {
          loading: 'Mengirim ke vendor...',
          success: `Berhasil diteruskan ke ${request?.vendor ?? 'vendor'}`,
          error: 'Gagal mengirim ke vendor'
        }
      )

      // Update status
      setRequests(requests.map(r => 
        r.id === id ? { ...r, status: 'Sent to Vendor' } : r
      ))
    } catch (error) {
      toast.error("Gagal mengirim ke vendor")
    }
  }



  return (
    <SidebarLayout>
     <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard USC</h1>
            <p className="text-muted-foreground">Manajemen pengajuan dan koordinasi vendor</p>
          </div>
        </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pengajuan
              </CardTitle>
              <Badge>{requests.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length} Permintaan</div>
              <p className="text-xs text-muted-foreground">
                {requests.filter(r => r.status === 'Pending').length} menunggu tindakan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sudah Diproses
              </CardTitle>
              <Badge variant="secondary">{requests.filter(r => r.status === 'Sent to Vendor').length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {((requests.filter(r => r.status === 'Sent to Vendor').length / requests.length) * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground">Tingkat penyelesaian</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendor Aktif
              </CardTitle>
              <Badge variant="outline">{Object.values(vendorList).flat().length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(vendorList).length} Kategori
              </div>
              <p className="text-xs text-muted-foreground">
                Total {Object.values(vendorList).flat().length} vendor terdaftar
              </p>
            </CardContent>
          </Card>
        </div>

       <Card>
          <CardHeader>
            <CardTitle>Daftar Pengajuan</CardTitle>
            <CardDescription>
              Pilih vendor dan teruskan pengajuan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Pengajuan</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Pemohon</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.requester}</TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Select
                        value={request.vendor}
                        onValueChange={(value) => handleVendorSelect(request.id, value)}
                        disabled={request.status === 'Sent to Vendor'}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Pilih vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendorList[request.type]?.map((vendor) => (
                            <SelectItem key={vendor.id} value={vendor.name}>
                              {vendor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        request.status === 'Pending' ? 'default' :
                        request.status === 'Sent to Vendor' ? 'secondary' :
                        'outline'
                      }>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleSendToVendor(request.id)}
                        disabled={request.status === 'Sent to Vendor' || !request.vendor}
                      >
                        Teruskan ke Vendor
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
           </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
)
}