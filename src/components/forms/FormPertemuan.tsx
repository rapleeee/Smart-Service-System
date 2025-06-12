'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { isTimeSlotBooked, getBookingsForDate } from "@/utils/bookingDates"
import { format, isBefore, addDays } from "date-fns"


const formSchema = z.object({
  judulPertemuan: z.string().min(1, "Judul pertemuan harus diisi"),
  unitKerja: z.string().min(1, "Unit kerja harus diisi"),
  tanggal: z.date({
    required_error: "Tanggal harus dipilih"
  }).nullable(),
  waktuMulai: z.string().min(1, "Waktu mulai harus diisi"),
  waktuSelesai: z.string().min(1, "Waktu selesai harus diisi"),
  ruangan: z.string().min(1, "Ruangan harus dipilih"),
  jumlahPeserta: z.string().min(1, "Jumlah peserta harus diisi"),
  kebutuhanTambahan: z.string(),
  picNama: z.string().min(1, "Nama PIC harus diisi"),
  picHP: z.string().min(1, "Nomor HP PIC harus diisi")
});

type FormData = z.infer<typeof formSchema>;

export default function FormPertemuan() {
  const initialFormState: FormData = {
    judulPertemuan: '',
    unitKerja: '',
    tanggal: null,
    waktuMulai: '',
    waktuSelesai: '',
    ruangan: '',
    jumlahPeserta: '',
    kebutuhanTambahan: '',
    picNama: '',
    picHP: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [bookingConflict, setBookingConflict] = useState(false);

  

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = formSchema.safeParse(formData);
    
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Check if date is at least 2 days from now
    const minDate = addDays(new Date(), 2);
    if (formData.tanggal && isBefore(formData.tanggal, minDate)) {
      toast.error("Pengajuan harus minimal 2 hari dari sekarang");
      return;
    }

    // Check for booking conflicts
    if (formData.tanggal && isTimeSlotBooked(
      formData.ruangan,
      formData.tanggal,
      formData.waktuMulai,
      formData.waktuSelesai
    )) {
      toast.error("Jadwal yang dipilih sudah dibooking!");
      return;
    }

    const key = `pengajuan_pertemuan_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(formData));
    toast.success("Pengajuan pertemuan berhasil disimpan!");
    setFormData(initialFormState);
  };
  const checkAvailability = () => {
    if (formData.tanggal && formData.ruangan) {
      const bookings = getBookingsForDate(formData.ruangan, formData.tanggal);
      if (bookings.length > 0) {
        setBookingConflict(true);
        // Show existing bookings
        toast.warning(
          <div className="space-y-2">
            <p className="font-medium">Jadwal terbooked untuk ruangan ini:</p>
            {bookings.map(booking => (
              <p key={booking.id} className="text-sm">
                {booking.waktuMulai} - {booking.waktuSelesai} ({booking.departemen})
              </p>
            ))}
          </div>
        );
      } else {
        setBookingConflict(false);
      }
    }
  };

  // Add useEffect to check availability when room or date changes
  useEffect(() => {
    checkAvailability();
  }, [formData.ruangan, formData.tanggal]);


  return (
    <div className="space-y-8">
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800">Informasi Penting</h3>
        <p className="text-sm text-yellow-700">
          Pastikan pengajuan minimal 2 hari sebelum tanggal pertemuan. Guna memeriksa ketersediaan ruangan sebelum mengajukan pertemuan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2">Judul Pertemuan</Label>
            <Input 
              value={formData.judulPertemuan}
              onChange={(e) => setFormData({...formData, judulPertemuan: e.target.value})}
              placeholder="Contoh: Rapat Koordinasi Tim IT"
            />
          </div>

          <div>
            <Label className="mb-2">Unit Kerja</Label>
            <Input 
              value={formData.unitKerja}
              onChange={(e) => setFormData({...formData, unitKerja: e.target.value})}
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
                  onSelect={(date) => setFormData({...formData, tanggal: date ?? null})}
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
        <Label className="mb-2">Ruangan</Label>
        <Select 
          onValueChange={(value) => {
            setFormData({...formData, ruangan: value});
          }}
        >
          <SelectTrigger className={cn(
            bookingConflict && "border-yellow-500 ring-yellow-500"
          )}>
            <SelectValue placeholder="Pilih ruangan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting-room-1">
              Meeting Room 1 (Kapasitas: 10 orang)
            </SelectItem>
            <SelectItem value="meeting-room-2">
              Meeting Room 2 (Kapasitas: 20 orang)
            </SelectItem>
            <SelectItem value="ballroom">
              Ballroom (Kapasitas: 100 orang)
            </SelectItem>
            <SelectItem value="auditorium">
              Auditorium (Kapasitas: 200 orang)
            </SelectItem>
          </SelectContent>
        </Select>
        {bookingConflict && (
          <p className="mt-2 text-sm text-yellow-600">
            ⚠️ Ada jadwal yang sudah terbooked pada tanggal ini
          </p>
        )}
      </div>

          <div>
            <Label className="mb-2">Jumlah Peserta</Label>
            <Input 
              type="number"
              value={formData.jumlahPeserta}
              onChange={(e) => setFormData({...formData, jumlahPeserta: e.target.value})}
              placeholder="Masukkan jumlah peserta"
            />
          </div>

          <div className="col-span-full">
            <Label className="mb-2">Kebutuhan Tambahan</Label>
            <Textarea 
              value={formData.kebutuhanTambahan}
              onChange={(e) => setFormData({...formData, kebutuhanTambahan: e.target.value})}
              placeholder="Contoh: Proyektor, Sound System, dll"
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