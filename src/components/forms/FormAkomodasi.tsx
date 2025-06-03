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

interface RoomOccupant {
  name: string;
  nip: string;
  position: string;
  roomType: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
}

interface FormData {
  unitKerja: string;
  hotel: string;
  hotelAddress: string;
  totalRooms: number;
  occupants: RoomOccupant[];
  proofDocument?: File;
}

export default function FormAkomodasi() {
  const initialFormState: FormData = {
    unitKerja: '',
    hotel: '',
    hotelAddress: '',
    totalRooms: 0,  
    occupants: [],
    proofDocument: undefined
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => {
  e.preventDefault();
  
  // Validate main form fields
  if (!formData.unitKerja) {
    toast.error("Unit kerja harus diisi");
    return;
  }
  if (!formData.hotel) {
    toast.error("Hotel harus dipilih");
    return;
  }
  if (!formData.hotelAddress) {
    toast.error("Alamat hotel harus diisi");
    return;
  }
  if (!formData.totalRooms || formData.totalRooms < 1) {
    toast.error("Jumlah kamar harus diisi");
    return;
  }
  if (!formData.proofDocument) {
    toast.error("Bukti wisma penuh harus dilampirkan");
    return;
  }
   for (let i = 0; i < formData.occupants.length; i++) {
    const occupant = formData.occupants[i];
    if (!occupant.name) {
      toast.error(`Nama penghuni kamar ${i + 1} harus diisi`);
      return;
    }
    if (!occupant.nip) {
      toast.error(`NIP penghuni kamar ${i + 1} harus diisi`);
      return;
    }
    if (!occupant.position) {
      toast.error(`Jabatan penghuni kamar ${i + 1} harus diisi`);
      return;
    }
    if (!occupant.roomType) {
      toast.error(`Tipe kamar ${i + 1} harus dipilih`);
      return;
    }
    if (!occupant.checkIn) {
      toast.error(`Tanggal check-in kamar ${i + 1} harus dipilih`);
      return;
    }
    if (!occupant.checkOut) {
      toast.error(`Tanggal check-out kamar ${i + 1} harus dipilih`);
      return;
    }

    // Validate check-out date is after check-in
    if (occupant.checkIn && occupant.checkOut && 
        occupant.checkOut <= occupant.checkIn) {
      toast.error(`Tanggal check-out kamar ${i + 1} harus setelah tanggal check-in`);
      return;
    }
  }

  // If all validations pass, save to localStorage
  const key = `pengajuan_akomodasi_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(formData));
  toast.success("Pengajuan berhasil disimpan!");
  
  setFormData(initialFormState);

};

  const handleRoomCountChange = (value: string) => {
    const count = parseInt(value);
    if (isNaN(count) || count < 0) {
      toast.error("Jumlah kamar tidak valid");
      setFormData(prev => ({ ...prev, totalRooms: 0, occupants: [] }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      totalRooms: count,
      occupants: Array(count).fill({
        name: '',
        nip: '',
        position: '',
        roomType: '',
        checkIn: undefined,
        checkOut: undefined
      })
    }));
  };

  const updateOccupant = (index: number, field: keyof RoomOccupant, value: RoomOccupant[keyof RoomOccupant]) => {
    const newOccupants = [...formData.occupants];
    newOccupants[index] = { ...newOccupants[index], [field]: value };
    setFormData({ ...formData, occupants: newOccupants });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <h3 className="font-semibold text-yellow-800">Perhatian</h3>
            <ul className="text-sm text-yellow-700">
              <li>Untuk pemesanan twinbed nama dan jabatan disatukan saja</li>
            </ul>
        </div>
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <h3 className="font-semibold text-red-800">Penting</h3>
            <ul className="text-sm text-red-700">
              <li>*Jabatan SM/M dan AM/JM maksimal bintang 4</li>
              <li>*Jabatan SS/SPV/JS maksimal bintang 3</li>
            </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <Label className="text-sm mb-2">
              Bukti Wisma Penuh
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
                  if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    toast.error("File terlalu besar. Maksimal 5MB");
                    return;
                  }
                  setFormData({ ...formData, proofDocument: file });
                }
              }}
              className="cursor-pointer"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Maksimal ukuran file: 5MB
            </p>
          </div>
          <div>
            <Label className="text-sm mb-2">Unit Kerja</Label>
            <Input
              value={formData.unitKerja}
              onChange={(e) => setFormData({ ...formData, unitKerja: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Hotel</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, hotel: value })} >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Hotel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel1">Hotel A</SelectItem>
                <SelectItem value="hotel2">Hotel B</SelectItem>
                <SelectItem value="hotel3">Hotel C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm mb-2">Alamat Hotel</Label>
            <Input
              value={formData.hotelAddress}
              onChange={(e) => setFormData({ ...formData, hotelAddress: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Jumlah Kamar</Label>
            <Input
              type="number"
              min="1"
              value={formData.totalRooms}
              onChange={(e) => handleRoomCountChange(e.target.value)}
            />
          </div>
        </div>

        {formData.occupants.map((occupant, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Data Penghuni Kamar {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-2">Nama Lengkap</Label>
                <Input
                  value={occupant.name}
                  onChange={(e) => updateOccupant(index, 'name', e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm mb-2">NIP</Label>
                <Input
                  value={occupant.nip}
                  onChange={(e) => updateOccupant(index, 'nip', e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm mb-2">Jabatan</Label>
                <Input
                  value={occupant.position}
                  onChange={(e) => updateOccupant(index, 'position', e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm mb-2">Tipe Kamar</Label>
                <Select onValueChange={(value) => updateOccupant(index, 'roomType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tipe Kamar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Twin</SelectItem>
                    <SelectItem value="double">King</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm mb-2">Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !occupant.checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {occupant.checkIn ? format(occupant.checkIn, "PPP") : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={occupant.checkIn}
                      onSelect={(date) => updateOccupant(index, 'checkIn', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm mb-2">Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !occupant.checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {occupant.checkOut ? format(occupant.checkOut, "PPP") : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={occupant.checkOut}
                      onSelect={(date) => updateOccupant(index, 'checkOut', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ))}

        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Submit Pengajuan
        </Button>
      </div>
    </div>
  )
}
