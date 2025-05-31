'use client'
import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ServiceRequest {
    serviceType: string;
    date: Date | undefined;
    time: string;
    location: string;
    numberOfParticipants: number;
    specialRequirements: string;
    supportingDocuments?: File[];
}

export default function PengajuanPage() {
    const [formData, setFormData] = useState<ServiceRequest>({
        serviceType: '',
        date: undefined,
        time: '',
        location: '',
        numberOfParticipants: 0,
        specialRequirements: '',
    });
    const [date, setDate] = useState<Date | undefined>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save to localStorage
        const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
        localStorage.setItem('serviceRequests', JSON.stringify([...existingRequests, formData]));
        alert('Pengajuan berhasil disimpan!');
    };

    return (
        <SidebarLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Form Pengajuan Layanan</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Jenis Layanan</Label>
                                <Select
                                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis layanan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pertemuan">Pertemuan</SelectItem>
                                        <SelectItem value="jamuan">Jamuan</SelectItem>
                                        <SelectItem value="akomodasi">Akomodasi</SelectItem>
                                        <SelectItem value="kendaraan">Kendaraan Dinas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Waktu</Label>
                                <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Lokasi</Label>
                                <Input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Tanggal</Label>
                                <div className="border rounded-md">
                                    {date ? (
                                        <div className="flex items-center justify-between p-0.5 mx-2">
                                            <span>{date.toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsCalendarOpen(true)}
                                            >
                                                Change
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-left font-normal"
                                            onClick={() => setIsCalendarOpen(true)}
                                        >
                                            <span>Pick a date</span>
                                        </Button>
                                    )}

                                    {isCalendarOpen && (
                                        <div className="absolute mt-2 bg-white border rounded-md shadow-lg p-3">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(newDate) => {
                                                    setDate(newDate);
                                                    setFormData({ ...formData, date: newDate });
                                                    setIsCalendarOpen(false);
                                                }}
                                                className="rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Jumlah Peserta</Label>
                                <Input
                                    type="number"
                                    value={formData.numberOfParticipants}
                                    onChange={(e) => setFormData({ ...formData, numberOfParticipants: parseInt(e.target.value) })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Dokumen Pendukung</Label>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        setFormData({ ...formData, supportingDocuments: files });
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Keperluan Khusus</Label>
                        <Textarea
                            value={formData.specialRequirements}
                            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                            placeholder="Masukkan keperluan khusus jika ada..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Submit Pengajuan
                    </Button>
                </form>
            </div>
        </SidebarLayout>
    );
}