'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  namaAcara: z.string().min(1, "Nama acara harus diisi"),
  departemen: z.string().min(1, "Departemen harus diisi"),
  tanggal: z.date({
    required_error: "Tanggal harus dipilih"
  }).nullable(),
  waktuPenyajian: z.string().min(1, "Waktu penyajian harus diisi"),
  jumlahOrang: z.string().min(1, "Jumlah peserta harus diisi"),
  jenisJamuan: z.string().min(1, "Jenis jamuan harus dipilih"),
  lokasiPenyajian: z.string().min(1, "Lokasi penyajian harus diisi"),
  catatanKhusus: z.string(),
  picNama: z.string().min(1, "Nama PIC harus diisi"),
  picHP: z.string().min(1, "Nomor HP PIC harus diisi"),
  anggaran: z.string().min(1, "Estimasi anggaran harus diisi")
});

type FormData = z.infer<typeof formSchema>;

export default function FormJamuan() {
  const initialFormState: FormData = {
    namaAcara: '',
    departemen: '',
    tanggal: null,
    waktuPenyajian: '',
    jumlahOrang: '',
    jenisJamuan: '',
    lokasiPenyajian: '',
    catatanKhusus: '',
    picNama: '',
    picHP: '',
    anggaran: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const key = `pengajuan_jamuan_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(formData));
    
    toast.success("Pengajuan berhasil!", {
      description: `Jamuan untuk ${formData.namaAcara} telah dijadwalkan`,
      action: {
        label: "Lihat Detail",
        onClick: () => console.log("View details clicked")
      },
      duration: 5000
    });

    setFormData(initialFormState);
  };

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800">Informasi Pengajuan Jamuan</h3>
        <p className="text-sm text-yellow-700">
          Pengajuan jamuan harus diajukan minimal 3 hari sebelum acara. 
          Pastikan memberikan informasi diet khusus atau alergi pada catatan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2">Nama Acara</Label>
            <Input 
              value={formData.namaAcara}
              onChange={(e) => setFormData({...formData, namaAcara: e.target.value})}
              placeholder="Contoh: Rapat Direksi"
            />
          </div>

          <div>
            <Label className="mb-2">Departemen</Label>
            <Input 
              value={formData.departemen}
              onChange={(e) => setFormData({...formData, departemen: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label className="mb-2">Tanggal</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.tanggal && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggal ? format(formData.tanggal, "PPP") : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.tanggal ?? undefined}
                  onSelect={(date) => {
                    if (date) setFormData({ ...formData, tanggal: date });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-2">Waktu Penyajian</Label>
            <Input 
              type="time"
              value={formData.waktuPenyajian}
              onChange={(e) => setFormData({...formData, waktuPenyajian: e.target.value})}
            />
          </div>

          <div>
            <Label className="mb-2">Jenis Jamuan</Label>
            <Select onValueChange={(value) => setFormData({...formData, jenisJamuan: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis jamuan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coffee-break">Coffee Break</SelectItem>
                <SelectItem value="lunch">Makan Siang</SelectItem>
                <SelectItem value="dinner">Makan Malam</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
                <SelectItem value="full-package">Paket Lengkap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Jumlah Peserta</Label>
            <Input 
              type="number"
              value={formData.jumlahOrang}
              onChange={(e) => setFormData({...formData, jumlahOrang: e.target.value})}
              placeholder="Masukkan jumlah peserta"
            />
          </div>

          <div>
            <Label className="mb-2">Lokasi Penyajian</Label>
            <Input 
              value={formData.lokasiPenyajian}
              onChange={(e) => setFormData({...formData, lokasiPenyajian: e.target.value})}
              placeholder="Contoh: Ruang Rapat Lantai 3"
            />
          </div>

          <div>
            <Label className="mb-2">Estimasi Anggaran</Label>
            <Input 
              type="number"
              value={formData.anggaran}
              onChange={(e) => setFormData({...formData, anggaran: e.target.value})}
              placeholder="Masukkan estimasi anggaran"
            />
          </div>

          <div className="col-span-full">
            <Label className="mb-2">Catatan Khusus</Label>
            <Textarea 
              value={formData.catatanKhusus}
              onChange={(e) => setFormData({...formData, catatanKhusus: e.target.value})}
              placeholder="Contoh: Diet khusus, alergi, preferensi vegetarian, dll"
              className="h-20"
            />
          </div>

          <div>
            <Label className="mb-2">Nama PIC</Label>
            <Input 
              value={formData.picNama}
              onChange={(e) => setFormData({...formData, picNama: e.target.value})}
            />
          </div>

          <div>
            <Label className="mb-2">Nomor HP PIC</Label>
            <Input 
              type="tel"
              value={formData.picHP}
              onChange={(e) => setFormData({...formData, picHP: e.target.value})}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Pengajuan
        </Button>
      </form>
    </div>
  )
}