'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod";


interface FormData {
  unitKerja: string;
  unitMobil: string;
  tanggalPakai: Date | undefined;
  waktuMulai: string;
  waktuSelesai: string;
  lokasiPenjemputan: string;
  tujuan: string;
  picNama: string;
  picHP: string;
  rdsDocument?: File;
}

export default function FormKendaraan() {
  const initialFormState: FormData = {
    unitKerja: '',
    unitMobil: '',
    tanggalPakai: undefined,
    waktuMulai: '',
    waktuSelesai: '',
    lokasiPenjemputan: '',
    tujuan: '',
    picNama: '',
    picHP: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

 const formSchema = z.object({
  unitKerja: z.string().min(1, "Unit kerja harus diisi"),
  unitMobil: z.string().min(1, "Unit mobil harus dipilih"),
  tanggalPakai: z.date({
    required_error: "Tanggal pakai harus dipilih"
  }),
  waktuMulai: z.string().min(1, "Waktu mulai harus diisi"),
  waktuSelesai: z.string().min(1, "Waktu selesai harus diisi"),
  lokasiPenjemputan: z.string().min(1, "Lokasi penjemputan harus diisi"),
  tujuan: z.string().min(1, "Tujuan harus diisi"),
  picNama: z.string().min(1, "Nama PIC harus diisi"),
  picHP: z.string().min(1, "Nomor HP PIC harus diisi"),
  rdsDocument: z.instanceof(File, { message: "Dokumen RDS harus dilampirkan" })
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const result = formSchema.safeParse(formData);
  
  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return;
  }

  if (formData.rdsDocument && formData.rdsDocument.size > 5 * 1024 * 1024) {
    toast.error("File terlalu besar. Maksimal 5MB");
    return;
  }

  const key = `pengajuan_kendaraan_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(formData));
  toast.success("Pengajuan berhasil disimpan!");
  setFormData(initialFormState);
};

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800">Perhatian</h3>
        <p className="text-sm text-yellow-700">
          Pastikan semua data diisi dengan benar dan lengkap. Pengajuan kendaraan dinas harus disertai dengan dokumen RDS yang telah disetujui.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2">Unit Kerja</Label>
            <Input 
              value={formData.unitKerja}
              onChange={(e) => setFormData({...formData, unitKerja: e.target.value})}
            />
          </div>

          <div>
            <Label className="mb-2">Unit Mobil</Label>
            <Select onValueChange={(value) => setFormData({...formData, unitMobil: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Unit Mobil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="innova">Toyota Innova</SelectItem>
                <SelectItem value="avanza">Toyota Avanza</SelectItem>
                <SelectItem value="hiace">Toyota Hiace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="mb-2">Tanggal Pakai</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.tanggalPakai && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggalPakai ? format(formData.tanggalPakai, "PPP") : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.tanggalPakai}
                  onSelect={(date) => setFormData({...formData, tanggalPakai: date})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Waktu Mulai</Label>
              <Input 
                type="time"
                value={formData.waktuMulai}
                onChange={(e) => setFormData({...formData, waktuMulai: e.target.value})}
              />
            </div>
            <div>
              <Label className="mb-2">Waktu Selesai</Label>
              <Input 
                type="time"
                value={formData.waktuSelesai}
                onChange={(e) => setFormData({...formData, waktuSelesai: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2">Lokasi Penjemputan</Label>
            <Input 
              value={formData.lokasiPenjemputan}
              onChange={(e) => setFormData({...formData, lokasiPenjemputan: e.target.value})}
            />
          </div>

          <div>
            <Label className="mb-2">Tujuan</Label>
            <Input 
              value={formData.tujuan}
              onChange={(e) => setFormData({...formData, tujuan: e.target.value})}
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

          <div className="col-span-full">
            <Label className="mb-2">
              Upload RDS Permohonan
              <span className="text-xs text-neutral-500 ml-1">
                (PDF, JPEG, JPG, PNG)
              </span>
            </Label>
            <Input
              type="file"
              accept=".pdf,.jpeg,.jpg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("File terlalu besar. Maksimal 5MB");
                    return;
                  }
                  setFormData({...formData, rdsDocument: file});
                }
              }}
              className="cursor-pointer"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Maksimal ukuran file: 5MB
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit Pengajuan
        </Button>
      </form>
    </div>
  );
}