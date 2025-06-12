interface BookingData {
  id: string;
  ruangan: string;
  tanggal: Date;
  waktuMulai: string;
  waktuSelesai: string;
  departemen: string;
}

// Dummy booked data
export const bookedData: BookingData[] = [
  {
    id: "BOOK-001",
    ruangan: "meeting-room-1",
    tanggal: new Date(2025, 5, 15), // June 15, 2025
    waktuMulai: "09:00",
    waktuSelesai: "11:00",
    departemen: "Direktorat SDM"
  },
  {
    id: "BOOK-003",
    ruangan: "meeting-room-1",
    tanggal: new Date(2025, 5, 19), // June 15, 2025
    waktuMulai: "09:00",
    waktuSelesai: "11:00",
    departemen: "Direktorat Operasional"
  },
  {
    id: "BOOK-004",
    ruangan: "meeting-room-2",
    tanggal: new Date(2025, 5, 19), // June 15, 2025
    waktuMulai: "11:00",
    waktuSelesai: "15:00",
    departemen: "Direktorat Teknologi Informasi"
  },
  {
    id: "BOOK-002",
    ruangan: "ballroom",
    tanggal: new Date(2025, 5, 16), // June 16, 2025
    waktuMulai: "13:00",
    waktuSelesai: "15:00",
    departemen: "Direktorat Keuangan"
  }
];

export const isTimeSlotBooked = (
  ruangan: string,
  tanggal: Date,
  waktuMulai: string,
  waktuSelesai: string
): boolean => {
  return bookedData.some(booking => 
    booking.ruangan === ruangan &&
    booking.tanggal.toDateString() === tanggal.toDateString() &&
    ((waktuMulai >= booking.waktuMulai && waktuMulai < booking.waktuSelesai) ||
     (waktuSelesai > booking.waktuMulai && waktuSelesai <= booking.waktuSelesai))
  );
};

export const getBookingsForDate = (ruangan: string, tanggal: Date): BookingData[] => {
  return bookedData.filter(booking => 
    booking.ruangan === ruangan &&
    booking.tanggal.toDateString() === tanggal.toDateString()
  );
};