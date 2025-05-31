export const notifications = [
    {
      id: '1',
      title: 'Pengajuan Dalam Peninjauan',
      message: 'Pengajuan layanan pertemuan Anda sedang dalam proses peninjauan.',
      timestamp: '5 menit yang lalu',
      status: 'review' as const
    },
    {
      id: '2',
      title: 'Konfirmasi Pertemuan',
      message: 'Jadwal konfirmasi pengajuan layanan telah dijadwalkan untuk besok.',
      timestamp: '1 jam yang lalu',
      status: 'pending' as const
    },
    {
      id: '3',
      title: 'Pengajuan Diterima',
      message: 'Pengajuan layanan kendaraan dinas Anda telah disetujui.',
      timestamp: '2 jam yang lalu',
      status: 'approved' as const
    },
    {
      id: '4',
      title: 'Pengembalian Berhasil',
      message: 'Pengembalian kendaraan dinas telah berhasil dicatat.',
      timestamp: '1 hari yang lalu',
      status: 'returned' as const
    }
  ];